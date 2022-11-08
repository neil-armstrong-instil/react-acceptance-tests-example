import {Database} from "./Database";
import type {Todo} from "@shared/graphql/database/types/Todo";

let target: Database;

beforeEach(() => {
  target = new Database();
});

describe("on first created", () => {
  it("should not have any todos", () => {
    expect(target.getTodos()).toEqual([]);
  });

  describe("given a todo is added", () => {
    const todo: Todo = {
      id: "1",
      message: "a todo"
    };

    beforeEach(() => {
      target.addTodo(todo);
    });

    it("should add todo to database", () => {
      expect(target.getTodos()).toEqual(<Todo[]>[
        todo
      ]);
    });

    describe("given a todo is updated", () => {
      beforeEach(() => {
        target.updateTodo("1", {
          message: "changed text"
        });
      });

      it("should update todo on database", () => {
        expect(target.getTodos()).toEqual(<Todo[]>[
          {
            ...todo,
            message: "changed text"
          }
        ]);
      });
    });

    describe("give a todo is deleted", () => {
      beforeEach(() => {
        target.deleteTodo("1");
      });

      it("should not have any todos", () => {
        expect(target.getTodos()).toEqual([]);
      });
    });
  });

  describe("given three todos are added to the database", () => {
    const todos: Todo[] = [
      {
        id: "1",
        message: "a todo"
      },
      {
        id: "1",
        message: "a todo"
      },
      {
        id: "1",
        message: "a todo"
      }
    ];

    beforeEach(() => {
      target.addTodo(todos[0]);
      target.addTodo(todos[1]);
      target.addTodo(todos[2]);
    });

    it("should have three todos", () => {
      expect(target.getTodos()).toEqual(todos);
    });

    describe("given 3rd todo is reordered to the first position", () => {
      beforeEach(() => {
        target.reorderTodos("3", 0);
      });

      it("should reorder todos", () => {
        expect(target.getTodos()).toEqual(<Todo[]>[
          todos[2],
          todos[0],
          todos[1]
        ]);
      });
    });
  });

  describe("given an attempt to delete a todo that doesn't exist is made", () => {
    let caughtError: Error;

    beforeEach(() => {
      try {
        target.deleteTodo("not in database");
      } catch (error) {
        caughtError = error;
      }
    });

    it("should throw error", () => {
      expect(caughtError).toBeDefined();
      expect(caughtError.message).toBe("Could not find todo with id not in database");
    });
  });
});

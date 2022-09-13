import {runTestsOn} from "@src/dsl/TestRunner";
import type {TodoPage} from "@src/dsl/todo/TodoPage";
import {buildTodoPage} from "@src/dsl/todo/TodoPage";
import {given, then, when} from "@src/dsl/shared/acceptance-criteria-mapping/AcceptanceCriteraMapping";
import {Todo} from "@src/dsl/todo/types/Todo";

let Todo: TodoPage;

runTestsOn(["Development", "Electron", "Android"], () => {
  beforeEach(async () => {
    Todo = await buildTodoPage();
  });

  // TODO: Renable when implemented
  given.skip("three todos on the page", () => {
    let todo1: Todo;
    let todo2: Todo;
    let todo3: Todo;

    beforeEach(async () => {
      todo1 = await Todo.create();
      todo2 = await Todo.create();
      todo3 = await Todo.create();
    });

    given("a user wants to reorder a todo", () => {
      when("the first todo is dropped on the last todo", () => {
        beforeEach(async () => {
          await Todo.dropOnto(todo1, todo3);
        });

        then("the todo list will be updated", async () => {
          expect(await Todo.getAtIndex(0)).toEqual(todo2);
          expect(await Todo.getAtIndex(1)).toEqual(todo3);
          expect(await Todo.getAtIndex(2)).toEqual(todo1);
        });
      });

      when("the last todo is dropped on the first todo", () => {
        beforeEach(async () => {
          await Todo.dropOnto(todo3, todo1);
        });

        then("the todo list will be updated", async () => {
          expect(await Todo.getAtIndex(0)).toEqual(todo1);
          expect(await Todo.getAtIndex(1)).toEqual(todo3);
          expect(await Todo.getAtIndex(2)).toEqual(todo2);
        });
      });
    });
  });
});

import {runTestsOn} from "@src/dsl/TestRunner";
import type {TodoPage} from "@src/dsl/todo/TodoPage";
import {buildTodoPage} from "@src/dsl/todo/TodoPage";
import {given, then, when} from "@src/dsl/shared/acceptance-criteria-mapping/AcceptanceCriteraMapping";
import {Todo} from "@src/dsl/todo/types/Todo";

let Todo: TodoPage;

runTestsOn(["Webapp", "Development", "Electron", "Android"], () => {
  beforeEach(async () => {
    Todo = await buildTodoPage();
  });

  given("a user wants to delete a todo", () => {
    let todoToDelete: Todo;

    beforeEach(async () => {
      todoToDelete = await Todo.create();
    });

    when("the page is navigated to for the first time", () => {
      beforeEach(async () => {
        await Todo.delete(todoToDelete);
      });

      then("the todo list will be empty", async () => {
        const count = await Todo.count();

        expect(count).toBe(0);
      });
    });
  });
});

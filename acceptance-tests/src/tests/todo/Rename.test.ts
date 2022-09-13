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

  given("a user wants to rename a todo", () => {
    let todoToRename: Todo;

    beforeEach(async () => {
      todoToRename = await Todo.create();
    });

    when("the todo is renamed", () => {
      let updatedTodo: Todo;

      beforeEach(async () => {
        updatedTodo = await Todo.rename(todoToRename, "Changed");
      });

      then("the todo will have the new text", async () => {
        expect(updatedTodo.textContent).toBe("Changed");
      });
    });
  });
});

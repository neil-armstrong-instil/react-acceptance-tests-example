import {runTestsOn} from "@src/dsl/TestRunner";
import type {TodoPage} from "@src/dsl/todo/TodoPage";
import {buildTodoPage} from "@src/dsl/todo/TodoPage";
import {given, then, when} from "@src/dsl/shared/acceptance-criteria-mapping/AcceptanceCriteraMapping";
import {Todo} from "@src/dsl/todo/types/Todo";

let Todo: TodoPage;

runTestsOn(["Webapp", "Development", "Electron", "Android", "DeployedApi"], () => {
  beforeEach(async () => {
    Todo = await buildTodoPage();
  });

  given("a user wants to add a new todo", () => {
    when("the 'add todo' button is pressed", () => {
      let newTodo: Todo;

      beforeEach(async () => {
        newTodo = await Todo.create("New todo!");
      });

      then("the new todo will be added", async() => {
        const count = await Todo.count();

        expect(count).toBe(1);
      });

      then("the new todo will have the default text", async() => {
        expect(newTodo.textContent).toBe("New todo!");
      });
    });
  });
});

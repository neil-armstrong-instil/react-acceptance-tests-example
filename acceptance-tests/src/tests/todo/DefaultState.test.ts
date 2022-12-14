import {runTestsOn} from "@src/dsl/TestRunner";
import type {TodoPage} from "@src/dsl/todo/TodoPage";
import {buildTodoPage} from "@src/dsl/todo/TodoPage";
import {given, then, when} from "@src/dsl/shared/acceptance-criteria-mapping/AcceptanceCriteraMapping";

let Todo: TodoPage;

runTestsOn(["Webapp", "Development", "Electron", "Android", "DeployedApi"], () => {
  beforeEach(async () => {
    Todo = await buildTodoPage();
  });

  given("a user wants a fresh page to add todos to", () => {
    when("the page is navigated to for the first time", () => {
      then("the todo list will be empty", async() => {
        const count = await Todo.count();

        expect(count).toBe(0);
      });
    });
  });
});

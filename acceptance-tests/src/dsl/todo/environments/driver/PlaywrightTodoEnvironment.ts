import type {TodoEnvironment} from "@src/dsl/todo/environments/base/TodoEnvironment";
import {BasePlaywrightDriver} from "@src/dsl/shared/drivers/playwright/BasePlaywrightDriver";
import type {PlaywrightWindow} from "@src/dsl/shared/environments/windows/playwright/PlaywrightWindow";
import {unimplementedMethodError} from "@src/dsl/shared/errors/UnimplementedMethodError";
import {TodosComponent} from "@src/dsl/todo/environments/driver/components/todos/TodosComponent";
import type {Todo} from "@src/dsl/todo/types/Todo";
import {ToolbarComponent} from "@src/dsl/todo/environments/driver/components/toolbar/ToolbarComponent";

export class PlaywrightTodoEnvironment extends BasePlaywrightDriver implements TodoEnvironment {
  public todos!: TodosComponent;
  public toolbar!: ToolbarComponent;

  constructor(playwrightWindow: PlaywrightWindow) {
    super(playwrightWindow);
  }

  override async asyncConstructor(): Promise<void> {
    await super.asyncConstructor();

    this.toolbar = new ToolbarComponent(this.driver);
    this.todos = new TodosComponent(this.driver);

    await this.refreshEnvironment();
  }

  async refreshEnvironment(): Promise<void> {
    await this.driver.reload();
  }

  async count(): Promise<number> {
    return await this.todos.count();
  }

  async create(): Promise<Todo> {
    await this.toolbar.createTodo();

    const count = await this.todos.count();
    const newestTodoAdded = this.todos.getTodoAtIndex(count - 1);
    return newestTodoAdded.details();
  }

  async delete(todoToDelete: Todo): Promise<void> {
    const todo = await this.todos.todoWithText(todoToDelete.textContent);
    await todo.delete();
  }

  async rename(todoToDelete: Todo, updatedText: string): Promise<Todo> {
    const todo = await this.todos.todoWithText(todoToDelete.textContent);
    await todo.text.click();
    await todo.text.selectText();
    await this.submitKeys(updatedText);

    return await this.todos.getTodoAtIndex(todo.index).details();
  }

  dropOnto = unimplementedMethodError;
  getAtIndex = unimplementedMethodError;
}

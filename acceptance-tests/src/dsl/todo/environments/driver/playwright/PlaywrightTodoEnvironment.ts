import type {TodoEnvironment} from "@src/dsl/todo/environments/base/TodoEnvironment";
import {BasePlaywrightDriver} from "@src/dsl/shared/drivers/playwright/BasePlaywrightDriver";
import type {PlaywrightWindow} from "@src/dsl/shared/environments/windows/playwright/PlaywrightWindow";
import {TodosComponent} from "@src/dsl/todo/environments/driver/playwright/components/todos/TodosComponent";
import type {Todo} from "@src/dsl/todo/types/Todo";
import {ToolbarComponent} from "@src/dsl/todo/environments/driver/playwright/components/toolbar/ToolbarComponent";

export class PlaywrightTodoEnvironment extends BasePlaywrightDriver implements TodoEnvironment {
  public todos!: TodosComponent;
  public toolbar!: ToolbarComponent;

  private todoNameCounter = 1;

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

  async create(textContent?: string): Promise<Todo> {
    if (!textContent) textContent = `${this.todoNameCounter++}`;

    await this.toolbar.createTodo();

    const count = await this.todos.count();
    return this.renameAtIndex(count - 1, textContent);
  }

  private async renameAtIndex(index: number, updatedText: string): Promise<Todo> {
    const todo = this.todos.getTodoAtIndex(index);
    await todo.text.click();
    await todo.text.selectText();
    await this.submitKeys(updatedText);

    return await this.todos.getTodoAtIndex(todo.index).details();
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

  async dropOnto(toDrag: Todo, toDropOnto: Todo): Promise<void> {
    const from = await this.todos.todoWithText(toDrag.textContent);
    const to = await this.todos.todoWithText(toDropOnto.textContent);

    await from.dragToTodo(to);
  }

  async getAtIndex(index: number): Promise<Todo> {
    const todoComponent = await this.todos.getTodoAtIndex(index);
    return await todoComponent.details();
  }
}

import {BaseComponent} from "@src/dsl/shared/drivers/playwright/types/BaseComponent";
import type {Page} from "playwright-core";
import type {Locator} from "@playwright/test";
import {TodoComponent} from "@src/dsl/todo/environments/driver/components/todos/components/TodoComponent";
import {repeatMap} from "@shared/stdlib/Loops";

export class TodosComponent extends BaseComponent {
  readonly container: Locator;
  readonly todos: Locator;

  constructor(public driver: Page) {
    super(driver);

    this.container = driver.locator(".todoCards");
    this.todos = this.container.locator(".todoCard");
  }

  async count(): Promise<number> {
    return await this.todos.count();
  }

  getTodoAtIndex(index: number): TodoComponent {
    return new TodoComponent(this.driver, index);
  }

  async todoWithText(textToFind: string): Promise<TodoComponent> {
    const todos = repeatMap(await this.count(), index => this.getTodoAtIndex(index));

    for (const todo of todos) {
      const textContent = await todo.textContent();
      if (textContent === textToFind) return todo;
    }

    throw new Error(`Could not find todo with text '${textToFind}'`);
  }
}

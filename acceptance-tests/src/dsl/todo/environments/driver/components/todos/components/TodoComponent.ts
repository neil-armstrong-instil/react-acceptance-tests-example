import {BaseComponent} from "@src/dsl/shared/drivers/playwright/types/BaseComponent";
import type {Page} from "playwright-core";
import type {Locator} from "@playwright/test";
import type {Todo} from "@src/dsl/todo/types/Todo";

export class TodoComponent extends BaseComponent {
  readonly container: Locator;
  readonly text: Locator;
  readonly deleteButton: Locator;

  constructor(public driver: Page, public readonly index: number) {
    super(driver);

    this.container = driver.locator(".todoCard").nth(index);
    this.text = this.container.locator(".todoCard__text");
    this.deleteButton = this.container.locator(".todoCard__delete");
  }

  async textContent(): Promise<string> {
    return await this.text.inputValue();
  }

  async delete(): Promise<void> {
    await this.deleteButton.click();
  }

  async details(): Promise<Todo> {
    return {
      textContent: await this.textContent()
    };
  }

  async dragToTodo(to: TodoComponent): Promise<void> {
    await this.dragTo(to.container);
  }
}

import type {Page} from "playwright-core";
import type {Locator} from "@playwright/test";
import {BaseComponent} from "@src/dsl/shared/drivers/playwright/types/BaseComponent";

export class ToolbarComponent extends BaseComponent {
  readonly container: Locator;
  readonly addTodoButton: Locator;

  constructor(public driver: Page) {
    super(driver);

    this.container = driver.locator(".toolbar");
    this.addTodoButton = this.container.locator(".addTodoButton");
  }

  async createTodo(): Promise<void> {
    return await this.addTodoButton.click();
  }
}

import type {Page} from "playwright-core";

export abstract class BasePage {
  protected constructor(public driver: Page) {
  }

  // Put helpers you want on all pages here
}

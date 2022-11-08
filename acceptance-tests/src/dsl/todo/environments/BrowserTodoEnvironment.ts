import {PlaywrightTodoEnvironment} from "./driver/playwright/PlaywrightTodoEnvironment";
import type {BrowserWindowConfig} from "@src/dsl/shared/environments/windows/browser/BrowserWindow";
import {BrowserWindow} from "@src/dsl/shared/environments/windows/browser/BrowserWindow";

export class BrowserTodoEnvironment extends PlaywrightTodoEnvironment {
  constructor(url: string, config?: BrowserWindowConfig) {
    super(new BrowserWindow(url, config));
  }
}

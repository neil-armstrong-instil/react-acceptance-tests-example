import {PlaywrightTodoEnvironment} from "./driver/PlaywrightTodoEnvironment";
import type {BrowserWindowConfig} from "@src/dsl/shared/environments/windows/browser/BrowserWindow";
import {BrowserWindow} from "@src/dsl/shared/environments/windows/browser/BrowserWindow";

export class BrowserSystemDesignEnvironment extends PlaywrightTodoEnvironment {
  constructor(url: string, config?: BrowserWindowConfig) {
    super(new BrowserWindow(url, config));
  }
}

import {ElectronWindow} from "@src/dsl/shared/environments/windows/electron/ElectronWindow";
import {PlaywrightTodoEnvironment} from "./driver/playwright/PlaywrightTodoEnvironment";

export class ElectronTodoEnvironment extends PlaywrightTodoEnvironment {
  constructor() {
    super(new ElectronWindow());
  }
}

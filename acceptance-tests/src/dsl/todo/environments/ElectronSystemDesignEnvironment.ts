import {ElectronWindow} from "@src/dsl/shared/environments/windows/electron/ElectronWindow";
import {PlaywrightTodoEnvironment} from "./driver/PlaywrightTodoEnvironment";

export class ElectronSystemDesignEnvironment extends PlaywrightTodoEnvironment {
  constructor() {
    super(new ElectronWindow());
  }
}

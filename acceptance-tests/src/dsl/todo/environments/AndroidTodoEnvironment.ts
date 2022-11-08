import {PlaywrightTodoEnvironment} from "./driver/playwright/PlaywrightTodoEnvironment";
import {AndroidWindow} from "@src/dsl/shared/environments/windows/android/AndroidWindow";

export class AndroidTodoEnvironment extends PlaywrightTodoEnvironment {
  constructor() {
    super(new AndroidWindow());
  }
}

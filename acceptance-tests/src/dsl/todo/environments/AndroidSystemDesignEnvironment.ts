import {PlaywrightTodoEnvironment} from "./driver/PlaywrightTodoEnvironment";
import {AndroidWindow} from "@src/dsl/shared/environments/windows/android/AndroidWindow";

export class AndroidSystemDesignEnvironment extends PlaywrightTodoEnvironment {
  constructor() {
    super(new AndroidWindow());
  }
}

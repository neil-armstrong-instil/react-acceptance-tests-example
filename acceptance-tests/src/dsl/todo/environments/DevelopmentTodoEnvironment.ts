import {BrowserTodoEnvironment} from "./BrowserTodoEnvironment";

export class DevelopmentTodoEnvironment extends BrowserTodoEnvironment {
  constructor() {
    super("http://localhost:3000", {
      headless: false
    });
  }
}

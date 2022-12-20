import {BrowserTodoEnvironment} from "./BrowserTodoEnvironment";

export class WebappTodoEnvironment extends BrowserTodoEnvironment {
  constructor() {
    super("https://acceptance-test-example-webapp.onrender.com");
  }
}

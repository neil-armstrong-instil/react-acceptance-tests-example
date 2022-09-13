import {BrowserSystemDesignEnvironment} from "./BrowserSystemDesignEnvironment";

export class DevelopmentSystemDesignEnvironment extends BrowserSystemDesignEnvironment {
  constructor() {
    super("http://localhost:3000", {
      headless: false
    });
  }
}

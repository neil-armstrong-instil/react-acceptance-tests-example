import {BrowserSystemDesignEnvironment} from "./BrowserSystemDesignEnvironment";

export class WebappSystemDesignEnvironment extends BrowserSystemDesignEnvironment {
  constructor() {
    // TODO: Add real deployed url
    super("https://google.com");
  }
}

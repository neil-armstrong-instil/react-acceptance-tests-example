import {BaseBrowserWindow} from "./base/BaseBrowserWindow";
import type {BrowserWindow} from "electron";
import {shell} from "electron";

export class MainWindow extends BaseBrowserWindow {
  constructor() {
    super();

    this.height = 1080;
    this.width = 1920;
  }

  override show(): BrowserWindow {
    const browserWindow = super.show();
    this.openLinksInRealWebBrowser(browserWindow);
    return browserWindow;
  }

  private openLinksInRealWebBrowser(browserWindow: BrowserWindow): void {
    browserWindow.webContents.setWindowOpenHandler(({url}) => {
      shell.openExternal(url);
      return {action: "deny"};
    });
  }
}

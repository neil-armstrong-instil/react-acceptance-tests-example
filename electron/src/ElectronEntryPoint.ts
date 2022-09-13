import type {BrowserWindow} from "electron";
import {app} from "electron";
import electronIsDev from "electron-is-dev";
import gracefullyHandleUnhandledErrors from "electron-unhandled";
import {MainWindow} from "./windows/MainWindow";
import {setupReloadWatcher} from "./setup/ReloadWatcher";
import {setupContentSecurityPolicy} from "./setup/ContentSecurityPolicy";
import {urlScheme} from "./windows/base/config/Capacitor";

gracefullyHandleUnhandledErrors();

const windows: BrowserWindow[] = [];

(async () => {
  await app.whenReady();
  setupContentSecurityPolicy(urlScheme);
  const mainWindow = new MainWindow();
  const mainWindowAsBrowserWindow = mainWindow.show();
  windows.push(mainWindowAsBrowserWindow);

  if (electronIsDev) {
    setupReloadWatcher(mainWindowAsBrowserWindow);
  }
})();

app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {CapacitorSplashScreen, CapElectronEventEmitter, setupCapacitorElectronPlugins} from "@capacitor-community/electron";
import type {Event} from "electron";
import {app, BrowserWindow, Menu, Tray} from "electron";
import buildAttachWebappToElectronFunction from "electron-serve";
import createElectronWindowState from "electron-window-state";
import * as path from "path";
import {capacitorElectronConfig, urlScheme} from "./config/Capacitor";
import {icon} from "./config/Icon";
import {appMenuBarMenuTemplate, trayMenuTemplate} from "./config/MenuTemplates";

const attachWebappToElectron = buildAttachWebappToElectronFunction({
  directory: path.join(app.getAppPath(), "app"),
  scheme: urlScheme
});

export abstract class BaseBrowserWindow {
  protected browserWindowArgs: string | undefined;
  protected height = 1000;
  protected width = 800;

  private splashScreen: CapacitorSplashScreen | null = null;

  show(): BrowserWindow {
    const browserWindow = this.initMainWindow();
    this.initTrayIconAndMenu(browserWindow);
    this.initApplicationMenu();

    this.openElectronWindow(browserWindow);

    this.initSecurity(browserWindow);
    (async () => setupCapacitorElectronPlugins())();

    return browserWindow;
  }

  private initMainWindow(): BrowserWindow {
    const mainWindowState = createElectronWindowState({});
    const browserWindow = new BrowserWindow({
      ...mainWindowState,
      height: this.height,
      width: this.width,
      icon: icon,
      show: false,
      webPreferences: {
        contextIsolation: true, // protect against prototype pollution
        preload: path.join(app.getAppPath(), "build", "src", "setup", "Preload.js"),
        additionalArguments: this.browserWindowArgs ? [this.browserWindowArgs] : undefined
      }
    });
    mainWindowState.manage(browserWindow);

    if (capacitorElectronConfig.backgroundColor && capacitorElectronConfig.electron?.backgroundColor) {
      browserWindow.setBackgroundColor(capacitorElectronConfig.electron.backgroundColor);
    }

    browserWindow.on("closed", () => this.onClose());

    return browserWindow;
  }

  private onClose(): void {
    // If we close the main window with the splashscreen enabled we need to destory the reference.
    if (this.splashScreen?.getSplashWindow() && !this.splashScreen.getSplashWindow().isDestroyed()) {
      this.splashScreen.getSplashWindow().close();
    }
  }

  private initTrayIconAndMenu(browserWindow: BrowserWindow): void {
    if (!capacitorElectronConfig.electron?.trayIconAndMenuEnabled) return;

    const trayIcon = new Tray(icon);
    trayIcon.on("double-click", () => {
      if (browserWindow.isVisible()) {
        browserWindow.hide();
      } else {
        browserWindow.show();
        browserWindow.focus();
      }
    });
    trayIcon.on("click", () => {
      if (!browserWindow) return;

      if (browserWindow.isVisible()) {
        browserWindow.hide();
      } else {
        browserWindow.show();
        browserWindow.focus();
      }
    });
    trayIcon.setToolTip(app.getName());
    trayIcon.setContextMenu(Menu.buildFromTemplate(trayMenuTemplate));
  }

  private initApplicationMenu(): void {
    Menu.setApplicationMenu(Menu.buildFromTemplate(appMenuBarMenuTemplate));
  }

  private openElectronWindow(browserWindow: BrowserWindow): void {
    if (capacitorElectronConfig.electron?.splashScreenEnabled) {
      // If the splashscreen is enabled, show it first while the main window loads then switch it out for the main window, or just load the main window from the start.
      this.splashScreen = new CapacitorSplashScreen({
        imageFilePath: path.join(
          app.getAppPath(),
          "assets",
          capacitorElectronConfig.electron?.splashScreenImageName ?? "splash.png"
        ),
        windowWidth: 400,
        windowHeight: 400
      });
      this.splashScreen.init(() => attachWebappToElectron(browserWindow), this);
    } else {
      attachWebappToElectron(browserWindow);
    }

    browserWindow.webContents.on("dom-ready", () => this.onDomReady(browserWindow));
  }

  private onDomReady(browserWindow: BrowserWindow): void {
    if (capacitorElectronConfig.electron?.splashScreenEnabled && this.splashScreen) {
      this.splashScreen.getSplashWindow().hide();
    }
    if (!capacitorElectronConfig.electron?.hideMainWindowOnLaunch) {
      browserWindow.show();
    }

    setTimeout(() => {
      CapElectronEventEmitter.emit("CAPELECTRON_DeeplinkListenerInitialized", "");
    }, 400);
  }

  private initSecurity(browserWindow: BrowserWindow): void {
    browserWindow.webContents.setWindowOpenHandler((handlerDetails) => {
      return {
        action: handlerDetails.url.includes(urlScheme) ? "allow" : "deny"
      };
    });

    browserWindow.webContents.on("will-navigate", (event) => this.onWillNavigate(event, browserWindow));
  }

  private onWillNavigate(event: Event, browserWindow: BrowserWindow): void {
    if (!browserWindow.webContents.getURL().includes(urlScheme)) {
      event.preventDefault();
    }
  }
}

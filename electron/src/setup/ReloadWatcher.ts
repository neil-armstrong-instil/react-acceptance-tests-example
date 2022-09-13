import type {FSWatcher} from "chokidar";
import chokidar from "chokidar";
import {join} from "path";
import type {BrowserWindow} from "electron";
import {app} from "electron";

interface ReloadWatcher {
  debouncer: NodeJS.Timeout | null;
  ready: boolean;
  watcher: FSWatcher | null;
}

// Define components for a watcher to detect when the webapp is changed so we can reload in Dev mode.
const reloadWatcher: ReloadWatcher = {
  debouncer: null,
  ready: false,
  watcher: null
};

export function setupReloadWatcher(browserWindow: BrowserWindow): void {
  reloadWatcher.watcher = chokidar
    .watch(join(app.getAppPath(), "app"), {
      ignored: /[/\\]\./,
      persistent: true
    })
    .on("ready", () => {
      reloadWatcher.ready = true;
    })
    .on("all", () => {
      if (!reloadWatcher.ready) return;

      if (reloadWatcher.debouncer) clearTimeout(reloadWatcher.debouncer);
      reloadWatcher.debouncer = setTimeout(async () => {
        browserWindow.webContents.reload();

        reloadWatcher.ready = false;
        if (reloadWatcher.debouncer) clearTimeout(reloadWatcher.debouncer);
        reloadWatcher.debouncer = null;
        reloadWatcher.watcher = null;

        setupReloadWatcher(browserWindow);
      }, 1500);
    });
}

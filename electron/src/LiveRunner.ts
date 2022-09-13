import type {ChildProcessByStdio} from "child_process";
import {spawn} from "child_process";
import type {FSWatcher} from "chokidar";
import {watch} from "chokidar";

interface ReloadWatcher {
  debouncer: NodeJS.Timeout | null;
  ready: boolean;
  watcher: FSWatcher | null;
  restarting: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let child: ChildProcessByStdio<any, any, any> | null = null;
const reloadWatcher: ReloadWatcher = {
  debouncer: null,
  ready: false,
  watcher: null,
  restarting: false
};

///*
function runBuild(): Promise<void> {
  return new Promise<void>((resolve) => {
    const tempChild = spawn("yarn", ["build-dist"]);
    tempChild.once("exit", () => {
      resolve();
    });
    tempChild.stdout.pipe(process.stdout);
  });
}
//*/

async function spawnElectron(): Promise<void> {
  if (child) {
    child.stdin.pause();
    child.kill();
    child = null;
    await runBuild();
  }

  child = spawn("electron", ["--inspect=5858", "./"]);
  child.on("exit", () => {
    if (!reloadWatcher.restarting) {
      process.exit(0);
    }
  });
  child.stdout.pipe(process.stdout);
}

function setupReloadWatcher(): void {
  reloadWatcher.watcher = watch("./src/**/*", {
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
        reloadWatcher.restarting = true;
        await spawnElectron();
        reloadWatcher.restarting = false;
        reloadWatcher.ready = false;
        if (reloadWatcher.debouncer) clearTimeout(reloadWatcher.debouncer);
        reloadWatcher.debouncer = null;
        reloadWatcher.watcher = null;
        setupReloadWatcher();
      }, 500);
    });
}

(async () => {
  await runBuild();
  await spawnElectron();
  setupReloadWatcher();
})();

import type {AndroidDevice, Page} from "playwright-core";
import {_android as android} from "playwright-core";
import type {ChildProcessWithoutNullStreams} from "child_process";
import {execSync, spawn} from "child_process";
import {join, normalize} from "path";
import {platform} from "os";
import {androidApkPath} from "./AndroidApkPath";
import {androidHome} from "@src/utils/android/constants/AndroidHome";
import {androidVirtualDeviceDeviceName} from "@src/utils/android/constants/DeviceName";
import {adb} from "@src/utils/android/Commands";
import {androidVirtualDeviceIsSetup} from "@src/utils/android/DeviceIsSetup";
import type {PlaywrightWindow} from "@src/dsl/shared/environments/windows/playwright/PlaywrightWindow";
import {takePlaywrightScreenshot} from "@src/dsl/shared/environments/windows/playwright/TakePlaywrightScreenshot";

const androidPackageName = "co.instil";

let emulator: ChildProcessWithoutNullStreams | undefined;
let androidDevice: AndroidDevice | undefined;
let page: Page | undefined;

export class AndroidWindow implements PlaywrightWindow {
  async driver(): Promise<Page> {
    if (!androidVirtualDeviceIsSetup()) {
      throw new Error("Android device is not setup yet, please run `$ yarn create-avd`");
    }

    if (!androidDevice) {
      await startAndroidEmulator();

      const devices = await android.devices();
      if (devices.length === 0) {
        throw new Error("Failed to find any android devices");
      }
      androidDevice = devices[0];
    }

    if (!page) {
      const webview = await androidDevice.webView({
        pkg: androidPackageName
      });
      page = await webview.page();
    }

    return page;
  }
}

// Taken from https://github.com/wswebcreation/start-android-emulator/blob/master/lib/index.js
async function startAndroidEmulator(): Promise<void> {
  if (emulatorAlreadyRunning()) return;

  await spawnEmulatorProcess();

  installApk();
}

function emulatorAlreadyRunning(): boolean {
  if (emulator) return true;

  const result = execSync(`${androidHome()}/platform-tools/adb devices`);
  return result.includes("emulator-");
}

const spawnEmulatorProcess = (): Promise<void> => new Promise((resolve, reject) => {
  // Refer to https://developer.android.com/studio/run/emulator-commandline for command line options
  emulator = spawn(
    normalize(join(androidHome(), "/emulator/emulator")),
    [
      "-avd",
      androidVirtualDeviceDeviceName,
      "-no-snapstorage",
      "-no-boot-anim"
    ],
    {
      shell: platform() === "win32"
    }
  );

  emulator.stdout.on("data", (buffer) => {
    const line = Buffer.from(buffer).toString("utf-8");

    if (line.includes("boot completed")) {
      resolve();
    }
  });

  emulator.stderr.on("data", (buffer) => {
    const line = Buffer.from(buffer).toString("utf-8");
    if (!line.includes("(PLACEHOLDER) an actual error launching it if we discover any...")) return;

    reject();
    emulator?.kill();
    emulator = undefined;
  });
});

function installApk(): void {
  adb(`install -t ${androidApkPath}`);
  adb(`shell am start -n ${androidPackageName}/${androidPackageName}.MainActivity`);
}

export async function takeScreenshot(screenshotFileName: string): Promise<void> {
  await takePlaywrightScreenshot(page, screenshotFileName);
}

export async function cleanupAndroid(): Promise<void> {
  await page?.close({
    runBeforeUnload: true
  });
  page = undefined;

  await androidDevice?.close();
  androidDevice = undefined;

  emulator?.kill();
  emulator = undefined;
}

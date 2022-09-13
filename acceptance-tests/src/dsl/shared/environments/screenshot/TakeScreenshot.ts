import {takeScreenshot as takeBrowserScreenshot} from "@src/dsl/shared/environments/windows/browser/BrowserWindow";
import {takeScreenshot as takeElectronScreenshot} from "@src/dsl/shared/environments/windows/electron/ElectronWindow";
import {takeScreenshot as takeAndroidScreenshot} from "@src/dsl/shared/environments/windows/android/AndroidWindow";

export async function takeScreenshot(screenshotFileName: string): Promise<void> {
  await takeBrowserScreenshot(screenshotFileName);
  await takeElectronScreenshot(screenshotFileName);
  await takeAndroidScreenshot(screenshotFileName);
}

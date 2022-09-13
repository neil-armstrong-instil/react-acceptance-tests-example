import {cleanupElectron} from "@src/dsl/shared/environments/windows/electron/ElectronWindow";
import {cleanupBrowser} from "@src/dsl/shared/environments/windows/browser/BrowserWindow";
import {cleanupAndroid} from "@src/dsl/shared/environments/windows/android/AndroidWindow";

export async function environmentCleanup(): Promise<void> {
  await cleanupBrowser();
  await cleanupElectron();
  await cleanupAndroid();
}

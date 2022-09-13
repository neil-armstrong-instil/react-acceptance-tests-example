import type {ElectronApplication, Page} from "playwright-core";
import {_electron as electron} from "playwright-core";
import {localElectronExecutablePath} from "./ElectronExecutablePath";
import type {PlaywrightWindow} from "@src/dsl/shared/environments/windows/playwright/PlaywrightWindow";
import {takePlaywrightScreenshot} from "@src/dsl/shared/environments/windows/playwright/TakePlaywrightScreenshot";
import {waitFor} from "@shared/stdlib/SetTimeoutAsync";

let page: Page | undefined;
let electronApp: ElectronApplication | undefined = undefined;

export class ElectronWindow implements PlaywrightWindow {
  async driver(): Promise<Page> {
    if (!electronApp) {
      try {
        electronApp = await electron.launch({
          executablePath: localElectronExecutablePath()
        });
        // Just wait for the electron executable to settle
        await waitFor(1000);
      } catch (error) {
        console.error(`Failed to launch electron at path ${localElectronExecutablePath()}\n`, error);
        throw error;
      }
    }

    if (!page) {
      page = await electronApp.firstWindow();
      await page.reload();
      await page.locator(".app").waitFor();
    }

    return page;
  }
}

export async function takeScreenshot(screenshotFileName: string): Promise<void> {
  await takePlaywrightScreenshot(page, screenshotFileName);
}

export async function cleanupElectron(): Promise<void> {
  await page?.close();
  page = undefined;

  await electronApp?.close();
  electronApp = undefined;
}

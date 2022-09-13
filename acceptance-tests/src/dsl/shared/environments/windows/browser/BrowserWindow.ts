import type {Page} from "playwright-core";
import {chromium} from "playwright-core";
import type {Browser} from "@playwright/test";
import type {PlaywrightWindow} from "@src/dsl/shared/environments/windows/playwright/PlaywrightWindow";
import {takePlaywrightScreenshot} from "@src/dsl/shared/environments/windows/playwright/TakePlaywrightScreenshot";

export interface BrowserWindowConfig {
  headless?: boolean;
}

let browser: Browser | undefined = undefined;
let page: Page | undefined = undefined;

export class BrowserWindow implements PlaywrightWindow {
  constructor(private url: string, private config?: BrowserWindowConfig) {
  }

  async driver(): Promise<Page> {
    if (!browser) {
      browser = await chromium.launch({
        headless: this.config?.headless
      });
    }

    if (!page) {
      page = await browser.newPage();
      await page.goto(this.url);
    }

    return page;
  }
}

export async function takeScreenshot(screenshotFileName: string): Promise<void> {
  await takePlaywrightScreenshot(page, screenshotFileName);
}

export async function cleanupBrowser(): Promise<void> {
  await page?.close();
  page = undefined;

  await browser?.close();
  browser = undefined;
}

import {screenshotsDirectory} from "@src/utils/platform/Directories";
import type {Page} from "playwright-core";

export async function takePlaywrightScreenshot(page: Page | undefined, screenshotFileName: string): Promise<void> {
  if (!page) return;

  const screenshotPath = `${screenshotsDirectory()}/${screenshotFileName}.png`;

  return page.screenshot({
    path: screenshotPath
  })
    .then(() => console.log(`Saved error state screenshot to ${screenshotPath}`))
    .catch(error => console.error("Failed to save screenshot", error));
}

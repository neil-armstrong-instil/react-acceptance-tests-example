import type {Page} from "playwright-core";
import type {PlaywrightWindow} from "@src/dsl/shared/environments/windows/playwright/PlaywrightWindow";
import type {BaseEnvironment} from "@src/dsl/shared/environments/BaseEnvironment";
import {PlaywrightKeys} from "./types/PlaywrightKeys";
import type {KeyboardKeys} from "@src/dsl/shared/dsl/types/KeyboardKeys";
import type {MouseCursor} from "@src/dsl/shared/dsl/types/MouseCursor";
import type {Locator} from "@playwright/test";
import {expect} from "@jest/globals";
import {v4 as createUuid} from "uuid";
import {screenshotsDirectory} from "@src/utils/platform/Directories";
import {unimplementedMethodError} from "@src/dsl/shared/errors/UnimplementedMethodError";
import type {SubmitMethod} from "@src/dsl/shared/drivers/playwright/types/SubmitMethod";

const playwrightTimeout = 5000;

export abstract class BasePlaywrightDriver implements BaseEnvironment {
  protected driver!: Page;

  protected constructor(protected playwrightWindow: PlaywrightWindow) {
  }

  async asyncConstructor(): Promise<void> {
    this.driver = await this.playwrightWindow.driver();
    this.driver.setDefaultTimeout(playwrightTimeout);

    // Need this to cleanup dragging state between tests
    await this.finishDragging();
  }

  async submitKeys(text: string, submitMethod?: SubmitMethod): Promise<void> {
    submitMethod = submitMethod === undefined ? "Enter" : submitMethod;

    await this.driver.keyboard.insertText(text);

    switch (submitMethod) {
      case "Enter":
        return await this.driver.keyboard.press(PlaywrightKeys.Enter);
      case "Tab":
        return await this.driver.keyboard.press(PlaywrightKeys.Tab);
      case "Click away":
        // TODO: Fill this in
        return unimplementedMethodError();
      case "Escape":
        return await this.driver.keyboard.press(PlaywrightKeys.Escape);
    }
  }

  async typeKeyboardKey(key: KeyboardKeys): Promise<void> {
    switch (key) {
      case "Esc":
        return await this.driver.keyboard.press(PlaywrightKeys.Escape);
    }
  }

  async mouseCursor(): Promise<MouseCursor> {
    const cursorStyle = await this.driver.locator("body").evaluate(element => {
      return window.getComputedStyle(element).getPropertyValue("cursor");
    });

    switch (cursorStyle) {
      case "pointer":
        return "Pointer";
      case "not-allowed":
        return "Invalid";
      default:
        return "Default";
    }
  }

  async finishDragging(): Promise<void> {
    await this.driver.mouse.up({
      button: "left"
    });
  }

  // Taken from https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
  async isVisibleOnViewport(locator: Locator): Promise<boolean> {
    try {
      return await locator.evaluate(element => {
        const boundingBox = element.getBoundingClientRect();
        return (
          boundingBox.top >= 0 &&
          boundingBox.left >= 0 &&
          boundingBox.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          boundingBox.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      });
    } catch {
      return false;
    }
  }

  takeScreenshot(): Promise<void> {
    const screenshotPath = `${screenshotsDirectory()}/screenshots/${testName()}.png`;

    return this.driver.screenshot({
      path: screenshotPath
    }).then(() => {
        console.log(`Saved error state screenshot to ${screenshotPath}`);
      })
      .catch(error => {
        console.error("Failed to save screenshot", error);
      });
  }
}

function testName(): string {
  const testName = expect.getState().currentTestName;
  if (!testName) return `Unknown test ${createUuid()}`;

  return testName
    .replace(/when/, "- when")
    .replace(/should/, "- should");
}

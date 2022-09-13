import type {Page} from "playwright-core";

export interface PlaywrightWindow {
  driver(): Promise<Page>;
}

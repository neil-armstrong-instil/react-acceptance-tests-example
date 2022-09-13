import {environmentCleanup} from "@src/dsl/shared/environments/cleanup/EnvironmentCleanup";
import {afterAll, afterEach, beforeAll, expect} from "@jest/globals";
import {removeSync} from "fs-extra";
import {screenshotsDirectory} from "@src/utils/platform/Directories";
import type {Circus} from "@jest/types/build";
import {takeScreenshot} from "@src/dsl/shared/environments/screenshot/TakeScreenshot";

beforeAll(() => {
  removeSync(screenshotsDirectory());
});

afterAll(async () => {
  await environmentCleanup();
});

afterEach(async () => {
  const testDetails = getCurrentlyExecutingTestDetails();
  if (!testDetails) return;
  if (!testDetails.errors || testDetails.errors.length === 0) return;

  const screenshotPath = `${extractFilePath()}/${extractTestName(testDetails)}`;

  await takeScreenshot(screenshotPath);
});

function getCurrentlyExecutingTestDetails(): Circus.TestEntry | undefined {
  const allSymbolsOnGlobal: symbol[] = Object.getOwnPropertySymbols(global);
  const jestStateSymbol = allSymbolsOnGlobal.find(symbol => symbol.description === "JEST_STATE_SYMBOL");
  if (!jestStateSymbol) return;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const jestState = global[jestStateSymbol] as Circus.State;

  return jestState.currentlyRunningTest ?? undefined;
}

function extractFilePath(): string {
  const fullTestPath = expect.getState().testPath;
  if (!fullTestPath) return "";

  // Starts folders at `src` rather than starting with file system path like `/Users/`
  return fullTestPath.split("acceptance-tests")[1];
}

interface ObjectWithName {
  name: string;
  parent?: ObjectWithName;
}

function extractTestName(objectWithName: ObjectWithName): string {
  if (objectWithName.parent === undefined) return "";

  const parentName = extractTestName(objectWithName.parent);
  if (parentName === "") return objectWithName.name;

  return `${extractTestName(objectWithName.parent)}/${objectWithName.name}`;
}

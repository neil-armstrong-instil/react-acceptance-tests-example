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
  const testDetails = getTestDetailsWhenFailure();
  if (!testDetails) return;

  const screenshotPath = `${extractFilePath()}/${extractTestName(testDetails)}`;

  await takeScreenshot(screenshotPath);
});

function getTestDetailsWhenFailure(): Circus.TestEntry | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return global["acceptance-test-failed-test-details"];
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

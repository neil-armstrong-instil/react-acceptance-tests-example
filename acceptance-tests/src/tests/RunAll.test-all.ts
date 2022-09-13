/**
 * This is a special test file that allows us to retain the environment state for every test
 * Idea taken from https://github.com/facebook/jest/issues/7184#issuecomment-877653576
 */

import glob from "glob";
import path from "path";
import {describe} from "@jest/globals";

const testFiles = glob.sync("./src/tests/**/*.test.ts");

testFiles.forEach((testFile) => {
  describe(`${testFile}`, () => {
    require(path.resolve(testFile));
  });
});

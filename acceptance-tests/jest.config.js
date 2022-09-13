const baseConfig = require("../shared/config/jest.config.base");

module.exports = {
  ...baseConfig,
  testTimeout: 120000,
  setupFilesAfterEnv: [
    "./src/jest/JestCleanup.ts"
  ],
};

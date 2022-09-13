const baseConfig = require("./config/jest.config.base");

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    "@shared/(.*)": "<rootDir>/src/$1"
  }
};

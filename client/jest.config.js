const base = require("../jest.config.base");

module.exports = {
  ...base,

  rootDir: ".",

  name: "client",
  displayName: "client",

  setupTestFrameworkScriptFile: "./setupTest.js",
};

const base = require("./jest.config.base");

module.exports = {
  ...base,

  rootDir: ".",

  "projects": [
    "<rootDir>/client/jest.config.js",
    "<rootDir>/packages/*/jest.config.js",
    "<rootDir>/services/*/jest.config.js"
  ],
};

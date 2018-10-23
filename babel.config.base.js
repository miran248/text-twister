const presets = [
  "@babel/preset-env",
];

const plugins = [
  "@babel/plugin-proposal-function-sent",
  "@babel/plugin-proposal-export-namespace-from",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-syntax-import-meta",
  [ "@babel/plugin-proposal-class-properties", { "loose": true } ],
  "@babel/plugin-proposal-json-strings",
  "@babel/plugin-transform-arrow-functions",
];

module.exports = {
  presets,
  plugins,
};

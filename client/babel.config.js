const base = require("../babel.config.base");

module.exports = (api) => {
  api.cache(true);

  const presets = [
    ...base.presets,

    "@babel/preset-react",
  ];

  const plugins = [
    ...base.plugins,

    [ "babel-plugin-styled-components", { "displayName": true, "fileName": true, "transpileTemplateLiterals": false, "pure": true } ],
  ];

  return {
    presets,
    plugins,
  };
};

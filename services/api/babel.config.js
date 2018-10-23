const base = require("../../babel.config.base");

module.exports = (api) => {
  api.cache(true);

  return {
    ...base,
  };
};

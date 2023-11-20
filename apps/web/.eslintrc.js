//module.exports = require("../../packages/config/eslint-preset.js");
module.exports = {
    ...require('../../packages/config/eslint-preset.js'),
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: './tsconfig.json',
    },
  };
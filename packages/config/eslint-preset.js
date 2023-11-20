module.exports = {
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "unused-imports",
    "import",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["**/dist/*", "**/*.js"],
  extends: [
    "next",
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "no-console": ["warn"],
    "@next/next/no-html-link-for-pages": "off",
    'simple-import-sort/imports': 'warn',
    "import/no-extraneous-dependencies": [
      "warn",
      {"devDependencies": true}
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['../../packages/*/tsconfig.json','../../apps/*/tsconfig.json'],
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
 
};

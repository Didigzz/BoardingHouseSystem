/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['expo', 'prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 'warn',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
};

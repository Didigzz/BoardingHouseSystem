/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@vercel/style-guide/eslint/react"].map(require.resolve),
  parserOptions: {
    project: true,
  },
  rules: {
    "import/no-default-export": "off",
  },
};
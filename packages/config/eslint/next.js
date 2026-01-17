/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@vercel/style-guide/eslint/next"].map(require.resolve),
  parserOptions: {
    project: true,
  },
  rules: {
    "import/no-default-export": "off",
  },
};
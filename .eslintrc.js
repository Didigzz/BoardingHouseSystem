/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@bhms/eslint-config/next.js"],
  parserOptions: {
    project: ["./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
  },
  settings: {
    next: {
      rootDir: ["apps/web"],
    },
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "dist/",
    ".turbo/",
    "*.config.js",
    "*.config.mjs",
  ],
};

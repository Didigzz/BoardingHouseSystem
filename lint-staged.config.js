/** @type {import('lint-staged').Configuration} */
module.exports = {
  // TypeScript and JavaScript files in apps and packages
  "apps/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "packages/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],

  // Root config files - only prettier (no eslint)
  "*.{js,cjs,mjs}": ["prettier --write"],

  // JSON, YAML, and Markdown files
  "*.{json,yaml,yml,md}": ["prettier --write"],

  // CSS and styling files
  "*.{css,scss}": ["prettier --write"],

  // Prisma schema
  "*.prisma": ["prettier --write"],
};

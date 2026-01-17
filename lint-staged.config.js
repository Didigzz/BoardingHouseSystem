/** @type {import('lint-staged').Configuration} */
module.exports = {
  // TypeScript and JavaScript files in apps and packages
  "apps/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix --max-warnings=0",
    "prettier --write",
    "git add"
  ],
  "packages/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix --max-warnings=0", 
    "prettier --write",
    "git add"
  ],

  // Root config files - only prettier (no eslint)
  "*.{js,cjs,mjs}": ["prettier --write", "git add"],

  // JSON, YAML, and Markdown files
  "*.{json,yaml,yml,md}": ["prettier --write", "git add"],

  // CSS and styling files
  "*.{css,scss}": ["prettier --write", "git add"],

  // Prisma schema
  "*.prisma": ["prettier --write", "git add"],

  // TypeScript type checking (run once for all TS files)
  "**/*.{ts,tsx}": () => "pnpm typecheck",
};

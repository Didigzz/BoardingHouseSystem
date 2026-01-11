/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only changes
        "style", // Changes that don't affect meaning (formatting, etc)
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf", // Performance improvement
        "test", // Adding missing tests
        "build", // Changes to build system or dependencies
        "ci", // Changes to CI configuration files
        "chore", // Other changes that don't modify src or test files
        "revert", // Reverts a previous commit
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
  },
};

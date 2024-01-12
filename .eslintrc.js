module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-unused-vars": ["error", { varsIgnorePattern: "^_" }]
  }
};

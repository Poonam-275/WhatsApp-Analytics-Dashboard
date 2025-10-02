/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"], tsconfigRootDir: __dirname, ecmaFeatures: { jsx: true } },
  plugins: ["@typescript-eslint", "react"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "prettier"],
  settings: { react: { version: "detect" } },
  ignorePatterns: ["dist/**", "node_modules/**"]
};

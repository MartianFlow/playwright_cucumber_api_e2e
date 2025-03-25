// eslint.config.cjs
const js = require("@eslint/js");
const ts = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"], // forma de asegurar que se analicen los archivos .ts y .tsx
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      globals: {
        ...js.configs.recommended.languageOptions.globals,
        console: "readonly",
        process: "readonly",
        __dirname: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": ts
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "single", { "allowTemplateLiterals": true }],
      "no-console": "warn"
    }
  }
];
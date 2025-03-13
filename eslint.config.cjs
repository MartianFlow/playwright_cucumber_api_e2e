// eslint.config.cjs
const js = require("@eslint/js");
const ts = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"], // Asegura que se analicen los archivos .ts y .tsx
    languageOptions: {
      parser: tsParser,
      sourceType: "module"
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
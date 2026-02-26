import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "@typescript-eslint/parser";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint,
    },
  },
  {
    ignores: ["dist/", "node_modules/", ".astro/"],
  },
];

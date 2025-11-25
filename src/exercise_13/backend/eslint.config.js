// eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import jestPlugin from "eslint-plugin-jest";

export default [
    {
        ignores: ["dist", "node_modules"],
    },

    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...jestPlugin.environments.globals.globals,
                console: "readonly",
                process: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            jest: jestPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...jestPlugin.configs.recommended.rules,
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
];

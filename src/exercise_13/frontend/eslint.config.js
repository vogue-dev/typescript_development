// eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

export default [
    {
        ignores: ["dist", "node_modules"],
    },

    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            globals: {
                console: 'readonly',
                Node: "readonly",
                fetch: "readonly",
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
            },
            parser: tsparser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            react: reactPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "error",
        },
    },

    {
        files: ["**/*.test.{ts,tsx}"],
        languageOptions: {
            globals: {
                test: "readonly",
                expect: "readonly",
                describe: "readonly",
                beforeAll: "readonly",
                beforeEach: "readonly",
                afterAll: "readonly",
                afterEach: "readonly",
            },
        },
        rules: {
            "no-undef": "off",
        },
    }
];

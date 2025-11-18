import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default tseslint.config(
    {
        ignores: ["dist", "node_modules"]
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            prettier
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "prettier/prettier": "warn",
            "react/react-in-jsx-scope": "off"
        }
    }
);

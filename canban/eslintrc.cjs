module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: null,
        sourceType: "module",
        ecmaVersion: 2020
    },
    env: {
        node: true,
        es2021: true,
        jest: true
    },
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    rules: {
        "prettier/prettier": "warn"
    },
    ignorePatterns: ["dist", "node_modules"]
};

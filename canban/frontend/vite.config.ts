import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
        sourcemap: false,
        emptyOutDir: true,
        target: "esnext"
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/tests/setupTests.ts"
    }
});


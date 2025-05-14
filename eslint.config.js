import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig({
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      }
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
});
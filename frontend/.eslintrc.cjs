/* eslint-disable no-undef */
/** @type {import("eslint").Config} */
module.exports = {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:import/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:@typescript-eslint/recommended",
      "eslint-config-prettier"
    ],
    "settings": {
      "react": {
        "version": "detect"
      },
      "import/resolver": {
        "node": {
          "paths": [
            "src"
          ],
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
          ]
        }
      }
    },
    "rules": {
      "no-unused-vars": [
        "error",
        {
          "vars": "all",
          "args": "after-used",
          "ignoreRestSiblings": true,
          "argsIgnorePattern": "^_"
        }
      ],
      "react/react-in-jsx-scope": "off"
    }
  }

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended"
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Możesz ustawić na 'off', 'warn' lub 'error'
      '@typescript-eslint/no-explicit-any': 'warn', // Możesz ustawić na 'off', 'warn' lub 'error'
      'react/no-unescaped-entities': 'off' // Możesz ustawić na 'off', 'warn' lub 'error'
    },
  };
  
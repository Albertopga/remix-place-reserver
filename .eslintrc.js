/** @type {import('eslint').Linter.Config} */

module.exports = {
  extends: ['standard', '@remix-run/eslint-config', '@remix-run/eslint-config/node', 'plugin:jest/recommended', 'plugin:jest-formatting/recommended'],
  plugins: ['jest', 'jest-formatting', 'react'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
}

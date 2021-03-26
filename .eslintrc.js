module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 10,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  },
}

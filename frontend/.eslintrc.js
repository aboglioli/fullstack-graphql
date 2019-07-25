module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: 'readonly',
    module: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    'react/jsx-uses-react': 1,
    'react/jsx-no-undef': 2,
    'react/jsx-wrap-multilines': 2,
    'react/no-string-refs': 0,
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': "all"
      }
    ],
    'eqeqeq': ['error', 'always'],
    'no-return-await': 2,
    'require-await': 2,
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'no-console': 0
  },
};

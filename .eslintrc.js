module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: ['react'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'default-param-last': 0,
    'react/jsx-no-target-blank': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'object-curly-newline': 0,
    'comma-dangle': 0,
  },
};

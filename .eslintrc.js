module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  rules: {
    'vue/comment-directive': 0,
    'nuxt/no-cjs-in-config': 'off',
    'vue/no-v-html': 'off',
    'no-useless-escape': 'off',
    'no-useless-catch': 'off',
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: 1,
    }],
  },
};

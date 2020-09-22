module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0, // 函数前不检测空格,和格式化冲突
    'standard/no-callback-literal': 0
  },
  globals: {
    "Vue": false,
    "axios": false,
    "VueI18n": false,
    "Vuex": false,
    "VueRouter": false,
    "moment": false
  },
}
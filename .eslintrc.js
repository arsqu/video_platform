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
    'space-before-function-paren': 0, // 函数前不检测空格,和beauty格式化冲突
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'standard/no-callback-literal': 0
  },
  "globals": {
    "Vue": false,
    "axios": false,
    "VueI18n": false,
    "Vuex": false,
    "moment": false
  },
}
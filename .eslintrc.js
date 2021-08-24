module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 'indent': 'off',
    "indent": [2,2],
    'no-var': 2,
    "no-extra-semi": 2,
    "prefer-const": 0
    // "semi": [2, "always"],
    // "comma-dangle": [2, "never"],
    // "consistent-return": 0,
    // "curly": [2, "all"],
    // "eqeqeq": 2,
    // "guard-for-in": 0,
    // "init-declarations": 0,
    // "new-parens": 2,
  },
};

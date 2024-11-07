module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    // Best Practices
    eqeqeq: "error",
    "no-invalid-this": "error",
    "no-return-assign": "error",
    // 'no-unused-expressions': ['error', { allowTernary: true }],
    "no-unused-expressions": "off",
    "no-useless-concat": "error",
    "no-useless-return": "error",

    // Variable
    // 'init-declarations': 'error',
    "no-use-before-define": "error",

    "no-unused-vars": "off", // Disable the no-unused-vars rule

    // Stylistic Issues
    // "array-bracket-newline": ["error", { multiline: true, minItems: null }],
    "array-bracket-newline": "off",
    "array-bracket-spacing": "error",
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "block-spacing": "error",
    "comma-dangle": "off",
    "comma-spacing": "error",
    "comma-style": "error",
    "computed-property-spacing": "error",
    "func-call-spacing": "error",
    // 'implicit-arrow-linebreak': ['error', 'beside'],

    "implicit-arrow-linebreak": "off",

    // indent: ['error', 4],
    "keyword-spacing": "error",
    // 'multiline-ternary': ['error', 'never'],
    "multiline-ternary": "off",

    // 'no-lonely-if': 'error',
    "no-mixed-operators": "off",
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
    "no-tabs": "error",
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": "off",
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: true },
    ],
    "quote-props": ["error", "as-needed"],
    // quotes: ['error', 'prefer-single'],
    // semi: ['error', 'never'],
    semi: "off",
    // 'semi-spacing': 'error',
    // "semi": 'off',
    "semi-spacing": "off",
    "space-before-blocks": "error",
    // 'space-before-function-paren': 'error',
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",

    // ES6
    "arrow-spacing": "error",
    "no-confusing-arrow": "off",
    "no-duplicate-imports": "error",
    "no-var": "error",
    "object-shorthand": 0,
    "prefer-const": "error",
    "prefer-template": "off",
  },
};

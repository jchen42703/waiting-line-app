const common = {
  env: {
    node: true,
    es6: true,
    "jest/globals": true,
  },
  plugins: ["prettier", "jest"],
  extends: ["airbnb-base", "plugin:jest/recommended", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "jest/expect-expect": "off",
    "jest/prefer-expect-assertions": "off",
    "jest/no-test-return-statement": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "no-console": "off",
    "no-iterator": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "consistent-return": "off",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-continue": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/naming-convention": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "new-cap": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off", // this should probably be turned on, but would require refactoring
    "prefer-destructuring": ["error", { object: true, array: false }],
  },
};

module.exports = {
  // ...common,
  root: true,
  overrides: [
    {
      ...common,
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json", // REF: https://www.npmjs.com/package/eslint-config-airbnb-typescript
      },
      env: common.env,
      plugins: [...common.plugins, "@typescript-eslint"],
      extends: [
        ...common.extends,
        "airbnb-typescript/base", // "base" does not include tsx rules. REF: https://www.npmjs.com/package/eslint-config-airbnb-typescript
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier", // Let prettier have high priority
      ],
      rules: {
        ...common.rules,
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
      settings: {
        "import/resolver": {
          typescript: {},
        },
      },
    },
  ],
};

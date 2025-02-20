const eslint     = require("@eslint/js");
const tseslint   = require("typescript-eslint");
const globals    = require("globals");
const checkFile  = require("eslint-plugin-check-file");

const namingOptions = [
   "error",
   {
      selector: "default",
      format: ["camelCase"],
      leadingUnderscore: "allow" },
  {
      selector: "variable",
      modifiers: ["const"],
      format: ["camelCase", "UPPER_CASE"],
      leadingUnderscore: "allow" },
  {
      selector: ["function", "classMethod"],
      filter: "^[a-z].*_",                                 // allow function names with "_"
      format: null },
  {
      selector: "typeLike",
      format: ["PascalCase"] },
   {
      selector: "import",
      format: ["camelCase", "PascalCase"] },
   ];

const rules = {

   // Additional Standard ESLint rules:
   "curly": "error",
   "default-case-last": "error",
   "id-denylist": [ "error", "any", "Number", "number", "String", "string", "Boolean", "boolean", "Undefined", "undefined" ],
   "id-match": "error",
   "new-parens": "error",
   "no-new": "error",
   "no-new-func": "error",
   "no-new-wrappers": "error",
   "no-octal-escape": "error",
   "no-param-reassign": "error",
   "no-promise-executor-return": "warn",
   "no-restricted-syntax": ["error", {
      selector: "AssignmentExpression[parent.type!='ExpressionStatement']",
      message: "Do not nest assignments" }],
   "no-sequences": "error",
   "no-template-curly-in-string": "error",
   "no-useless-backreference": "error",
   "no-useless-return": "error",
   "prefer-const": "error",
   "prefer-promise-reject-errors": "error",
   "require-atomic-updates": "error",

   // Modifications of default rules:
   "no-constant-condition": ["error", {checkLoops: false }],

   // Additional Typescript plugin rules:
   "@typescript-eslint/explicit-member-accessibility": "error",
   "@typescript-eslint/naming-convention": namingOptions,
   "@typescript-eslint/no-base-to-string": ["error", {ignoredTypeNames: ["Error"]}],
   "@typescript-eslint/no-invalid-this": "error",                                    "no-invalid-this": "off",
   "@typescript-eslint/no-loop-func": "error",                                       "no-loop-func": "off",
   "@typescript-eslint/no-loss-of-precision": "error",                               "no-loss-of-precision": "off",
   "@typescript-eslint/no-redeclare": "error",                                       "no-redeclare": "off",
   "@typescript-eslint/no-shadow": "error",                                          "no-shadow": "off",
   "@typescript-eslint/no-unused-expressions": "error",                              "no-unused-expressions": "off",
   "@typescript-eslint/no-unused-vars": ["error", {argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_"}],      "no-unused-vars": "off",
// "@typescript-eslint/no-use-before-define": ["error", {functions: false}],         "no-use-before-define": "off",
   "@typescript-eslint/only-throw-error": "error",
   "@typescript-eslint/prefer-includes": "warn",
// "@typescript-eslint/prefer-nullish-coalescing": "warn",
   "@typescript-eslint/prefer-optional-chain": "warn",
   "@typescript-eslint/require-await": "error",                                      "require-await": "off",
   "@typescript-eslint/switch-exhaustiveness-check": "error",

   // Modifications of preset Typescript rules:
// "@typescript-eslint/ban-types": ["error", {extendDefaults: true, types: {Function: false, Object: false}}],
   "@typescript-eslint/explicit-module-boundary-types": "off",
   "@typescript-eslint/no-explicit-any": "off",
   "@typescript-eslint/no-empty-function": "off",
   "@typescript-eslint/no-empty-interface": "off",
   "@typescript-eslint/no-empty-object-type": "off",
   "@typescript-eslint/no-inferrable-types": "off",
   "@typescript-eslint/no-non-null-assertion": "off",
   "@typescript-eslint/no-unnecessary-type-assertion": "off", // off because it does not work correctly
   "@typescript-eslint/no-unsafe-argument": "off",
   "@typescript-eslint/no-unsafe-assignment": "off",
   "@typescript-eslint/no-unsafe-call": "off",
   "@typescript-eslint/no-unsafe-function-type": "off",
   "@typescript-eslint/no-unsafe-member-access": "off",
   "@typescript-eslint/no-unsafe-return": "off",
   "@typescript-eslint/no-wrapper-object-types": "off",
   "@typescript-eslint/restrict-plus-operands": "off",
   "@typescript-eslint/restrict-template-expressions": "off",
   "@typescript-eslint/consistent-type-assertions": "off",
   "@typescript-eslint/array-type": "off",
   "@typescript-eslint/prefer-for-of": "off",
   "no-var": "off",                                     // @typescript-eslint/recommended switches this on

   // Check-file plugin rules:
   "check-file/filename-naming-convention": ["error", {"**/*.ts": "[A-Z]*"}],
   };

module.exports = tseslint.config({
   files: ["src/**/*.ts"],
   plugins: {
      "check-file": checkFile },
   languageOptions: {
   parserOptions: {
      project: "./tsconfig.json",
         warnOnUnsupportedTypeScriptVersion: false,
         },
      globals: {
        ...globals.browser }},
   extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
      ],
   rules });

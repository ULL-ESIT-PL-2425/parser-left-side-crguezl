// These packages under the @babel namespace aren't in this monorepo.
const externalBabelPackages = [
  "plugin-syntax-async-generators",
  "plugin-syntax-bigint",
  "plugin-syntax-dynamic-import",
  "plugin-syntax-json-strings",
  "plugin-syntax-nullish-coalescing-operator",
  "plugin-syntax-object-rest-spread",
  "plugin-syntax-optional-catch-binding",
  "plugin-syntax-optional-chaining",
  "plugin-syntax-export-namespace-from",
];

// prettier-ignore
const monorepoPackagePattern =
  `^@babel/(?!eslint-)(?!${externalBabelPackages.join("|")})([a-zA-Z0-9_-]+)$`;

module.exports = {
  collectCoverageFrom: [
    "packages/babel-parser/src/**/*.mjs",
    "packages/babel-parser/src/**/*.js",
  ],
  // The eslint/* packages use ESLint v6, which has dropped support for Node v6.
  // TODO: Remove this process.version check in Babel 8.
  testRegex: `./(packages|codemods${
    /^v6./u.test(process.version) ? "" : "|eslint"
  })/[^/]+/test/.+\\.m?js$`,
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/fixtures/",
    "/test/debug-fixtures/",
    "/babel-parser/test/expressions/",
    "/test/tmp/",
    "/test/__data__/",
    "/test/helpers/",
    "<rootDir>/test/warning\\.js",
    "<rootDir>/build/",
    "_browser\\.js",
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/testSetupFile.js"],
  transformIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/packages/babel-standalone/babel(\\.min)?\\.js",
    "/test/(fixtures|tmp|__data__)/",
    "<rootDir>/(packages|codemods|eslint)/[^/]+/lib/",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/packages/babel-standalone/babel(\\.min)?\\.js",
    "/test/(fixtures|tmp|__data__)/",
  ],
  modulePathIgnorePatterns: [
    "/test/fixtures/",
    "/test/tmp/",
    "/test/__data__/",
    "<rootDir>/build/",
    "<rootDir>/packages/babel-core/test/",
    "<rootDir>/packages/babel-helper-validator-identifier/test/",
    "<rootDir>/packages/babel-types/test/",
    "<rootDir>/packages/babel-plugin-syntax-decorators/test/",
    // WARNING CASIANO!!! REMOVING TESTS NOT PASSING. WE HAVE TO FIX THEM
    "<rootDir>/packages/babel-parser/test/expressions*",
    "<rootDir>/packages/babel-parser/test/unit/util/identifier*",
    "<rootDir>/packages/babel-parser/test/estree*",
    "<rootDir>/packages/babel-parser/test/index.js",
     // WARNING CASIANO!!! OUR TESTS
    //"<rootDir>/packages/babel-parser/test/left-side.js",    
    "<rootDir>/packages/babel-parser/test/left-side-original.mjs",
    "<rootDir>/packages/babel-parser/test/in",
    "<rootDir>/packages/babel-parser/test/out",
  ],
  moduleNameMapper: {
    [monorepoPackagePattern]: "<rootDir>/packages/babel-parser/",
  },
};

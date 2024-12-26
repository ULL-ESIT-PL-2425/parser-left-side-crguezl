> [!CAUTION]
> This repo is a toy/conceptual  experiment to have a minimal monorepo having the extended Babel parser and the plugin(s) for testing and publishing. It is work in progress.


## Goal

To be able to have a minimal monorepo with the parser and the plugin(s) of the TFGs.

We have to use a Babel configured for flow to transpile the TFG babel parser at [packages/babel-parser](https://github.com/ULL-ESIT-PL/babel-tanhauhau/tree/pablo-tfg) and leave 
a JS parser at `packages/babel-parser/lib`  ready to be used. 

## Scripts

Here is the list of project [scripts](package.json):

`➜  parser-left-side-crguezl git:(main) npm pkg get scripts`
```json
{
  "test": "npx jest -t 'left-side'",
  "alltest": "jest",
  "example": "cd examples && npm test",
  "cleanlib": "cd packages/babel-parser/lib && rm -fR index.js options.js plugin-utils.js types.js plugins util tokenizer parser",
  "clean": "npm run cleanlib; rm -fR node_modules; rm -fR packages/babel-parser/node_modules; rm package-lock.json; npm i",
  "save": "git ci -am save; git push",
  "flow": "flow",
  "buildflow": "babel packages/babel-parser/src/ -d packages/babel-parser/lib/",
  "rollup": "gulp build-rollup && npm run cleanbuild",
  "build": "npm run buildflow && npm run rollup",
  "cleanbuild": "cd packages/babel-parser/lib && rm -fR options.js plugin-utils.js types.js plugins util tokenizer parser",
  "rt": "flow-remove-types packages/babel-parser/src/ -d packages/babel-parser/lib/",
  "prepublishOnly": "npm run build"
}
```

## Building the parser

To compile the parser, we use `npm run build`. In my laptop takes less than 9 seconds. This is going to 

1. Compile the parser with Babel-Flow: `babel packages/babel-parser/src/ -d packages/babel-parser/lib/`. 
2. Call `gulp build-rollup` to bundle all the files in the final `lib/index.js`.
3. Clean the intermediate files.

Here is the output:

```bash
➜  parser-left-side-crguezl git:(main) ✗ npm run build

> @ull-esit-pl/babel-left-side-crguezl@1.0.0 build
> npm run buildflow && npm run rollup


> @ull-esit-pl/babel-left-side-crguezl@1.0.0 buildflow
> babel packages/babel-parser/src/ -d packages/babel-parser/lib/

@babel/preset-env: `DEBUG` option

Using targets:
{
  "node": "23"
}

Using modules transform: false

Using plugins:
  syntax-class-static-block
  syntax-private-property-in-object
  syntax-class-properties
  syntax-numeric-separator
  syntax-nullish-coalescing-operator
  syntax-optional-chaining
  syntax-json-strings
  syntax-optional-catch-binding
  syntax-async-generators
  syntax-object-rest-spread
  syntax-export-namespace-from
  syntax-dynamic-import
  syntax-top-level-await
  syntax-import-meta
  syntax-import-attributes

Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
Successfully compiled 33 files with Babel (1368ms).

> @ull-esit-pl/babel-left-side-crguezl@1.0.0 rollup
> gulp build-rollup && npm run cleanbuild

[08:49:45] Using gulpfile ~/campus-virtual/2324/research/parser-left-side-crguezl/gulpfile.js
[08:49:45] Starting 'build-rollup'...
[08:49:45] Compiling 'packages/babel-parser/src/index.js' with rollup ...
[08:49:47] Skipped minification of 'parser-left-side-crguezl/packages/babel-parser/lib/index.js' because not publishing
[08:49:47] Finished 'build-rollup' after 1.82 s

> @ull-esit-pl/babel-left-side-crguezl@1.0.0 cleanbuild
> cd packages/babel-parser/lib && rm -fR options.js plugin-utils.js types.js plugins util tokenizer parser
```

This is leaving the following files in `packages/babel-parser/lib`:

```bash
➜  parser-left-side-crguezl git:(main) ✗ ls -l packages/babel-parser/lib 
total 768
-rwxr-xr-x@ 1 casianorodriguezleon  staff  391324 24 dic 09:13 index.js
```

## Folder examples

[In the folder `examples`](/examples/) we have the simplest example to test the extension:

```bash
➜  parser-left-side-crguezl git:(main) ✗ cat examples/hello.js
function @@ foo(bar) {
  return bar * 2;
}
foo(10) = 5;

console.log(foo(10)); //  5
console.log(foo(5));  // 10
```

To compile and run the example, we use `npm run example`:

```bash
➜  parser-left-side-crguezl git:(main) ✗ npm run example

> @ull-esit-pl/babel-left-side-crguezl@1.0.0 example
> cd examples && npm test


> examples@1.0.0 test
> npm i && babel hello.js --out-file hello.cjs && node hello.cjs

(node:65183) ExperimentalWarning: Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

up to date, audited 3 packages in 1s

found 0 vulnerabilities
5
10
```

In the folder you can find other examples:

```bash
➜  examples git:(main) ✗ ls *.js
example-method.js             example-multiparameter2.js    example-multiparameter4.js    example-nested-assignation.js
example-multiparameter.js     example-multiparameter3.js    example-multiparameter5.js    hello.js
```

## npm workspaces

This repo uses npm workspaces. See 
- [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [npm workspaces and overrides #DemoDays](https://www.youtube.com/watch?v=LJaLwlS0mj4)

`➜  parser-left-side-crguezl git:(main) npm pkg get workspaces`  
```json
[
  "packages/babel-parser",
  "packages/babel-plugin-left-side",
  "packages/babel-plugin-left-side-support"
]
```

## Tests 

I have simplified the tests to the minimum. See the [Jest config file](jest.config.js#L53-L74) to see the tests that are being ignored.
A goal for the future is to have all the tests passing.

### Left Side tests

By default `npm test` only runs the tests that have the string `left-side` in their name. See 
folder [packages/babel-parser/test/left-side](/packages/babel-parser/test/left-side) for the tests that are being run.
The driver at [test-left-side-wrapper.test.js](/packages/babel-parser/test/left-side/test-left-side-wrapper.test.js) 
compiles the files inside the folder [in/](/packages/babel-parser/test/left-side/in), runs them  and compares the output with the expected output in the folder [exec_out/](/packages/babel-parser/test/left-side/exec_out).

```bash
➜  parser-left-side-crguezl git:(main) npm test

> @ull-esit-pl/babel-left-side-crguezl@1.0.0 test
> npx jest -t 'left-side'

 PASS  packages/babel-parser/test/left-side/left-side.js
 PASS  packages/babel-parser/test/left-side/test-left-side-wrapper.test.js (5.296 s)

Test Suites: 3 skipped, 2 passed, 2 of 5 total
Tests:       12 skipped, 3 passed, 15 total
Snapshots:   0 total
Time:        7.215 s
Ran all test suites with tests matching "left-side".
```

### All tests

To run all the tests, use `npm run alltest`:
```
➜  parser-left-side-crguezl git:(main) ✗ npm run alltest

> @ull-esit-pl/babel-left-side-crguezl@1.0.0 alltest
> jest

 PASS  packages/babel-parser/test/unit/tokenizer/types.js
 PASS  packages/babel-parser/test/unit/util/location.js
 PASS  packages/babel-parser/test/left-side/left-side.js
 PASS  packages/babel-parser/test/plugin-options.js
 PASS  packages/babel-parser/test/left-side/test-left-side-wrapper.test.js (5.173 s)

Test Suites: 5 passed, 5 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        6.871 s
Ran all test suites.
```

## Publishing the packages

To avoid collision with Pablo's packages with the same names at ULL-ESIT-PL, we have to publish the packages with a different scope. I'm going to use `@ull-esit-pl-2425` as the scope.

- I forked the repo to https://github.com/ULL-ESIT-PL-2425/parser-left-side-crguezl
- I set a remote `pl2425` to https://github.com/ULL-ESIT-PL-2425/parser-left-side-crguezl
- We set all the scopes in all the workspaces [package.json](https://github.com/ULL-ESIT-PL-2425/parser-left-side-crguezl/blob/main/packages/babel-parser/package.json) files to `@ull-esit-pl-2425`
- We used workspaces option `npm version -ws patch` to update the version of the packages
- We used the workspaces option `npm publish -ws` to publish all the packages
 
    The `prepublishOnly` script in the `package.json` file of the packages runs `npm run build`:
- See the branch [crguezl](https://github.com/ULL-ESIT-PL/babel-left-side-npm-test/tree/crguezl) of the repo repo https://github.com/ULL-ESIT-PL/babel-left-side-npm-test/tree/crguezl used to test that the published npm packages work. You will see there an example of use of the published packages.

## Changes I remember I did

- In `packages/babel-plugin-left-side/`, I  substituted the `import` in Pablo's version of the plugin by a `require`:

   ```js
      //import template from "@babel/template";
      const template = require("@babel/template").default;
  ```
- The code in the plugin `packages/babel-plugin-left-side/src/plugin.js` has been modified to use 
  `const parser = require("../../babel-parser/lib");`

- The final user installs the (now separated) package `babel-plugin-left-side-support` and uses it in his/her project. See [examples/package.json](examples/package.json). This will change in the future.
- The babel.config.js in the `example` folder is relative to the root of the project but the final will use the package:

  ```js
  ➜  babel-left-side-crguezl git:(main) cat examples/babel.config.json 
  {
    "plugins": [
      "../packages/babel-plugin-left-side/"
    ]
  }
  ```

When attempting to build the parser with flow,
we have explicited the flow dependencies in root  `package.json`. 
These have been taken from Pablo's `package.json`. 
Only those required to make the parser work have been included.


`➜  parser-left-side-crguezl git:(main) ✗ jq '.devDependencies' package.json`
```json 
{
  "@babel/cli": "^7.10.1",
  "@babel/core": "^7.10.2",
  "@babel/preset-flow": "^7.10.1",
  "babel-plugin-syntax-hermes-parser": "^0.26.0",
  "flow-bin": "^0.257.1",
  "flow-remove-types": "^2.257.1",
  "@babel/plugin-proposal-class-properties": "^7.10.1",
  "@babel/plugin-proposal-dynamic-import": "^7.10.1",
  "@babel/plugin-proposal-export-namespace-from": "^7.10.1",
  "@babel/plugin-proposal-object-rest-spread": "^7.10.1",
  "@babel/plugin-transform-flow-strip-types": "^7.10.1",
  "@babel/plugin-transform-for-of": "^7.10.1",
  "@babel/plugin-transform-modules-commonjs": "^7.10.1",
  "@babel/plugin-transform-runtime": "^7.10.1",
  "@babel/preset-env": "^7.10.2",
  "@babel/register": "^7.10.1",
  "@babel/runtime": "^7.10.2",
  "@rollup/plugin-json": "4.0.1",
  "babel-eslint": "^11.0.0-beta.2",
  "babel-jest": "^24.9.0",
  "babel-plugin-transform-charcodes": "^0.2.0",
  "browserify": "^16.2.3",
  "bundle-collapser": "^1.2.1",
  "chalk": "^2.4.2",
  "charcodes": "^0.2.0",
  "derequire": "^2.0.2",
  "enhanced-resolve": "^3.0.0",
  "gulp": "^4.0.2",
  "gulp-babel": "^8.0.0",
  "gulp-filter": "^5.1.0",
  "gulp-newer": "^1.0.0",
  "gulp-plumber": "^1.2.1",
  "rollup-plugin-babel": "^4.4.0",
  "rollup-plugin-commonjs": "^10.1.0",
  "rollup-plugin-node-builtins": "^2.1.2",
  "rollup-plugin-node-globals": "^1.4.0",
  "rollup-plugin-node-resolve": "^5.0.0",
  "rollup-plugin-replace": "^2.2.0",
  "rollup-plugin-terser": "^5.3.0",
  "test262-stream": "^1.3.0",
  "jest": "^29.7.0"
}
```

Then, we copy Pablo's flow [configuration in the root](.flowconfig) of the project:

`➜  parser-left-side-crguezl git:(main) ✗ cat .flowconfig`
```ini
[ignore]
<PROJECT_ROOT>/build/.*
<PROJECT_ROOT>/packages/.*/lib
<PROJECT_ROOT>/packages/.*/test
<PROJECT_ROOT>/codemods/.*/lib
<PROJECT_ROOT>/codemods/.*/test
<PROJECT_ROOT>/node_modules/module-deps/

[include]
packages/babel-parser/src
packages/babel-types/src


[libs]
lib/file.js
lib/parser.js
lib/third-party-libs.js.flow
lib/preset-modules.js.flow
packages/babel-types/lib/index.js.flow

[options]
include_warnings=true
suppress_comment= \\(.\\|\n\\)*\\$FlowFixMe
suppress_comment= \\(.\\|\n\\)*\\$FlowIssue
suppress_comment= \\(.\\|\n\\)*\\$FlowIgnore
suppress_type=$FlowFixMe
suppress_type=$FlowSubtype
esproposal.export_star_as=enable
esproposal.optional_chaining=enable
esproposal.nullish_coalescing=enable
module.name_mapper='^@babel\/\([a-zA-Z0-9_\-]+\)$' -> '<PROJECT_ROOT>/packages/babel-\1/src/index'
```

Then I did s.t. similar with Rollup.

## Monorepos

See

- [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [npm workspaces and overrides #DemoDays](https://www.youtube.com/watch?v=LJaLwlS0mj4)
- [SYTWS monorepo notes](https://ull-mii-sytws.github.io/temas/web/nextra/nextra-monorepo.html#introduction-to-monorepos-nextra-as-an-example)
- the tutorial <a href="https://youtu.be/KEkRy4q_0oI?si=cF419bnZBWBR159V" target="_blank">💥 Monorepo multipaquete con NPM Workspaces 📦 (FullStack Bootcamp JavaScript)</a> by Midudev.

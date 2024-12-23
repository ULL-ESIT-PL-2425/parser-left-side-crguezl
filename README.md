> [!CAUTION]
> This repo is a toy/conceptual  experiment to have a minimal monorepo having the parser and the plugin(s).


## Goal

To be able to have a minimal monorepo with the parser and the plugin(s) of the TFGs.

We have to use a Babel configured for flow to transpile the TFG babel parser at `packages/babel-parser` and leave 
a JS parser at `packages/babel-parser/lib`  ready to be used.



## A Few Tricks to Make it Work (but not an acceptable solution)

- In `packages/babel-plugin-left-side/`, I  substituted the `import` in Pablo's version of the plugin by a `require`:

   ```js
      //import template from "@babel/template";
      const template = require("@babel/template").default;
  ```
- The packages/babel-parser is substituted by the generated from the Pablo's branch (lib). Awful!. 
  - **Work to do: how to make the build using flow to transpile the TFG babel parser at `packages/babel-parser` and leave a JS parser at `packages/babel-parser/lib`  ready to be used.**
- The code in the plugin `packages/babel-plugin-left-side/src/plugin.js` has been modified to use 
  `const parser = require("../../babel-parser/lib");`
- The final user installs the (now separated) package `babel-plugin-left-side-support` and uses it in his/her project. See [examples/package.json](examples/package.json).
- The babel.config.js in this example is relative to the root of the project but the final will use the package:

  ```js
  ➜  babel-left-side-crguezl git:(main) cat examples/babel.config.json 
  {
    "plugins": [
      "../packages/babel-plugin-left-side/"
    ]
  }
  ```

## Compiling with Pablo's generated Parser

First, copy Pablo's generated parser `lib/index.js` to the `packages/babel-parser/lib`. Assuming you are in the `examples` directory and have a file hierarchy like mine:

``` 
➜  examples git:(main) ✗ pwd -P   
/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/examples
➜  examples git:(main) ✗ cp ../../pablo-santana-gonzalez/babel-tanhauhau-pablo/packages/babel-parser/lib/index.js ../packages/babel-parser/lib 
```

The compile the example. The plugin will override the parser for the babel transpiler:

```js 
➜  examples git:(main) ✗ npx babel hello.js 
(node:30127) ExperimentalWarning: Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
const {
  assign,
  functionObject
} = require("@ull-esit-pl/babel-plugin-left-side-support");
const foo = functionObject(function (bar) {
  return bar * 2;
});
assign(foo, [10], 5);
console.log(foo(10)); //  5
console.log(foo(5)); // 10
```

Now run it:

```
➜  examples git:(main) ✗ npx babel  hello.js | node 
(node:41665) ExperimentalWarning: Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
5
```

We have previously installed the support for the plugin:

```
➜  examples git:(main) ✗ jq '.dependencies' package.json 
{
  "@ull-esit-pl/babel-plugin-left-side-support": "^1.0.0"
}
```

### Parsing with Pablo's generated Parser

The parser works since uses the `lib/index.js` :

```js
➜  examples git:(main) ✗ ../packages/babel-parser/bin/babel-parser.js hello.js 
{
  "type": "File",
  "start": 0,
  "end": 112,
  ...
}
```

## Attempting to build the parser with flow 

First, we explicit the flow dependencies in root  `package.json`

```json 
➜  parser-left-side-crguezl git:(main) jq '.devDependencies' package.json
{
  "@babel/cli": "7.26",
  "@babel/core": "7.26",
  "@babel/preset-flow": "^7.25.9",
  "babel-plugin-syntax-hermes-parser": "^0.26.0",
  "flow-bin": "^0.257.1",
  "flow-remove-types": "^2.257.1"
}
```

Then, we copy Pablo's flow configuration in the root of the project:

`cat .flowconfig`
```json
[ignore]
<PROJECT_ROOT>/build/.*
<PROJECT_ROOT>/packages/.*/lib
<PROJECT_ROOT>/packages/.*/test
<PROJECT_ROOT>/codemods/.*/lib
<PROJECT_ROOT>/codemods/.*/test
<PROJECT_ROOT>/node_modules/module-deps/

[include]
packages/*/src

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
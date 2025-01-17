
## What is this?

> [!CAUTION]
> This is a work in progress. 

This is a library to give support to the Babel plugin @ull-esit-pl-2425/babel-plugin-left-side-plugin
[published in the GitHub registry](https://github.com/orgs/ULL-ESIT-PL-2425/packages)  inside the GitHub organization [ull-esit-pl-2425](https://github.com/ULL-ESIT-PL-2425) organization. 

This library provides the functions `assign` and `functionObject` and the class `FunctionObject`.


## Examples

### foo(2)(3) = 1

Given the code:

```js 
➜  examples git:(develop) ✗ pwd
/Users/casianorodriguezleon/campus-virtual/2324/research/parser-left-side-crguezl/packages/babel-plugin-left-side-support/examples
➜  examples git:(develop) ✗ cat many-parameters-nested-calls.cjs 
const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");

let foo = new FunctionObject(function (a, b) {
  return a + b;
});
assign(foo, [2], foo(2)), 
assign(foo(2), [3], 1); 
console.log(foo(2)(3)); // 1
console.log(foo(2)(5)); // 7
➜  examples git:(develop) ✗ node many-parameters-nested-calls.cjs
1
7
```

The constructor builds a function object that is a currified version of the function passed as an argument. The `assign` function is used to assign values to the function object. 

The constructor `FunctionObject` can be called with a function, an array, a map, a string, a number, a boolean, or an object. Here is an example with an array:

### Arrays

```js
➜  examples git:(develop) ✗ cat array.cjs 
const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
// Arrays
let a = functionObject([1, 2, 3]); // Function "a" behaves like "a.at"
console.log(a(0)); // 1
console.log(a(2)); // 3
console.log(a(3)); // undefined
console.log(a(-1)); // 3
try {
  a("chuchu");   // For strings "a" throws an exception
} catch (e) {
  console.log(e.message); // Invalid index "chuchu" for array access
}
; 
assign(a, [0], -3);
console.log(a(0)); // -3
assign(a, [2], 0);
console.log(a(2)); // 0
console.log(a.size); // 2
a.setCache(9, 1);
console.log(a(9)); // 1
console.log(a.getCache(9)); // 1
```

You can also pass a `Map` to the `setCache` method:

```js
➜  examples git:(main) ✗ cat functionobject-setMap.cjs 
const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
// Arrays
let a = functionObject([1, 2, 3]); // Potential Syntax @@ [1,2,3]
a.setCache(new Map([[3, 1], [4, 2], [5, 3]]));
console.log(a(3)); // 1
console.log(a.getCache(4)); // 2
```

Here is the output:

```
➜  examples git:(main) ✗ node functionobject-setMap.cjs 
1
2
```

### exception handler example

The `FunctionObject` constructor can also be called with an `option` object that can contain the following properties:

- `debug`: a boolean that enables debugging
- `exception`: a function that is called when an exception is thrown. The function receives the original argument  and the error object produced by the exception. 
The function can return a value that will be used instead of the exception.

Here is an example:

```js 
➜  examples git:(develop) ✗ cat exception-array-handling.cjs 
const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
let a = functionObject([1, 2, 3], {
  // A functionObject array produces exceptions when the index is not a number
  debug: false,
  exception: (x, e) => {
    console.log("handler called!", e?.message);
    if (typeof x === 'string') {
      return x.length;
    } else if (Array.isArray(x)) {
      return x.map(i => a(i));
    }
  }
});
console.log(a("hello")); // 5
console.log(a([2, 1, 0, -1, -2, -3])); // [ 3, 2, 1, 3, 2, 1 ]
➜  examples git:(develop) ✗ node exception-array-handling.cjs 
handler called! Invalid index "hello" for array access
5
handler called! Invalid index "2,1,0,-1,-2,-3" for array access
[ 3, 2, 1, 3, 2, 1 ]
```

### Example of assign and exception handling

```js 
➜  examples git:(main) ✗ cat array-function-length.cjs 
const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const b = [3, 2, 1];
let a = functionObject(b, {
  debug: false,
  exception: (x, e) => {
    if (typeof x == "string" && b[x] !== undefined) {
      return b[x];
    }
  }
});
assign(a, [-1], 2);
console.log(a(-1)); // 2
console.log(a("length")); // 3
assign(a, [3], 4);
console.log(a("length")); // 3 since "b" has not changed
console.log(a.cache.size); // 2
console.log(a.cache.toString()); // [[-1,2],[3,4]]
➜  examples git:(main) ✗ node array-function-length.cjs   
2
3
3
2
[[-1,2],[3,4]]
```

## The undef handler

The `undef` property of the `option` argument of the `FunctionObject` constructor 
can contain a function that will be called when the `rawFunction`  returns an `undefined` value. 
The function receives the original argument and the `primitive` object used for construction.

Here is an example:

`➜  examples git:(main) ✗ cat undef-handler-example.cjs`
```js
const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
let a = functionObject([1, 2, 3], {
  // A functionObject array produces exceptions when the index is not a number
  debug: false, // for developers
  undef: (x, primitive) => { // primitive is the array [1,2,3]
    throw new Error("Error accesing index '" + x + "' in array " + JSON.stringify(primitive));
  },
  exception: (x, e, primitive) => {
    if (typeof x === 'string' && primitive[x] !== undefined) {
      return primitive[x];
    } else if (Array.isArray(x)) {
      return x.map(i => a(i));
    } else throw e;
  }
});
console.log(a([2, 1, 0, -1, -2, -3])); // [ 3, 2, 1, 3, 2, 1 ]
console.log(a(-1)); // 3 the function object of "a" behaves as "a.at"
try {
  console.log(a(9));
} catch (e) {
  console.log(e.message);
}; // Error accesing index '9' in array [1,2,3]
console.log(a("length")); // 3
```

Here is the output:

```
➜  examples git:(main) ✗ node undef-handler-example.cjs 
[ 3, 2, 1, 3, 2, 1 ]
3
Error accesing index '9' in array [1,2,3]
3
```


## Install

Here are the node and npm versions I have used to test the packages:

```bash
➜  babel-npm-test node --version
v20.5.0
➜  babel-npm-test npm --version
9.8.0
```

These packages use the GitHub registry instead of the npm registry. Therefore, remember
to set the registry entry in your `.npmrc` file:

```bash
➜  babel-npm-test git:(main) ✗ cat ~/.npmrc | grep '@ull-esit-pl:'
@ull-esit-pl:registry=https://npm.pkg.github.com
```

or set an entry `registry` in your `package.json` file:

```bash
➜  babel-npm-test git:(main) ✗ jq '.registry' package.json 
"https://npm.pkg.github.com"
```

Then you can proceed to install the packages:

```
npm i -D @babel/cli@7.10 @ull-esit-pl/babel-plugin-left-side-plugin @ull-esit-pl/babel-plugin-left-side-support @ull-esit-pl/parser-left-side 
```

Your package.json `devDependencies` section will look similar to this:

`➜  babel-left-side-npm-test git:(main) ✗ jq '.devDependencies' package.json`
```json
{
  "@babel/cli": "^7.10.1",
  "@ull-esit-pl/babel-plugin-left-side-plugin": "latest",
  "@ull-esit-pl/babel-plugin-left-side-support": "latest",
  "@ull-esit-pl/parser-left-side": "latest"
}
```


## Compiling the code

To compile the example above add a `babel.config.js` to your workspace folder:

`➜  babel-npm-test git:(main) cat babel.config.js`
```js
module.exports = {
  "plugins": [
    "@ull-esit-pl/babel-plugin-left-side-plugin"
  ],
}
```

and then compile it using the installed packages:

```js
➜  babel-npm-test npx babel  example.js
```
This will output the compiled code to the console:

```js                                                      
const {
  assign,
  functionObject
} = require("@ull-esit-pl/babel-plugin-left-side-support");
const foo = functionObject(function (bar) {
  return bar * 2;
});
assign(foo, [10], 5);
console.log(foo(10));
console.log(foo(5));
```

If you want to save it to a file, use the `-o` option.

## Running

You can pipe the output to `node`:

```bash
➜  babel-npm-test npx babel  example.js | node  -
5
10
```

or alternatively, use the `-o` option to save the output to a file and then run it:

```
➜  babel-left-side-npm-test git:(main) npx babel  example.js -o example.cjs
➜  babel-left-side-npm-test git:(main) ✗ node example.cjs 
5
10
```

## References

- Our tutorial on babel: https://github.com/ULL-ESIT-PL/babel-learning/tree/main
- Section of the former tutorial describing how the packages were published: https://github.com/ULL-ESIT-PL/babel-learning/blob/main/doc/building-publishing.md
- Branch pablo-tfg with the actual code implementation: https://github.com/ULL-ESIT-PL/babel-tanhauhau/tree/pablo-tfg
- The original idea of the project is based on what is explained in this draft: https://www.authorea.com/users/147476/articles/1235078-function-expressions-on-the-left-side-of-assignments (submitted now to Science of Computer Programming
 journal)

## License

Same as Babel itself: [MIT](LICENSE)

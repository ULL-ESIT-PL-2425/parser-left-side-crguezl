const {
  assign,
  functionObject,
  FunctionObject,
  Storage
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
// May be in the future this will be a synonim of foo(a)(b) but by now let us throw an error
const foo = functionObject(function foo(a, b) {
  return a + b;
});
assign(foo, [2], foo(2)), assign(foo(2), [3], 5); // The call f(2,5) is not yet implemented
console.log(foo(2)(3)); // 5
console.log(foo(2)(5)); // 7
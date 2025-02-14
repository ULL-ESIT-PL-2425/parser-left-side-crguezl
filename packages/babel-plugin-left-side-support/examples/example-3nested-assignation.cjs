const {
  assign,
  functionObject,
  FunctionObject,
  Storage
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function foo(a) {
  return functionObject(function bar(b) {
    return functionObject(function baz(c) {
      return a + b + c;
    });
  });
});
// TODO: foo(2) is computed twice! It is urgent to optimize the assign function!!!!
// Inefficient translation of foo(2)(3)(5) = "Another value"
assign(foo, [2], foo(2)), assign(foo(2), [3], foo(2)(3)), assign(foo(2)(3), [5], "Another value");
console.log(foo(2)(3)(5)); // "Another Value"
console.log(foo(2)(3)(6)); // 11
console.log(foo(1)(3)(6)); // 10
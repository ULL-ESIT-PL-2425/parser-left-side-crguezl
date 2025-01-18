const {
  assign,
  functionObject,
  FunctionObject,
  mAssign
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");

let foo = new FunctionObject(function (a, b) {
  return a + b;
});
//assign(foo, [2], foo(2)), 
//assign(foo(2), [3], 1); // The call f(2,3) is not yet implemented
mAssign(foo, [2, 3], "other value") 
console.log(foo(2)(3)); // "other value"
console.log(foo(2)(9)(0)); // 9
console.log(foo(3)(2)); // 5

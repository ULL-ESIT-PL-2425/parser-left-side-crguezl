const {
  assign,
  functionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
let a = {
  foo: functionObject(function f(x) {
    // f = fun(x) { fun(y) { x + y } },
    return functionObject(function g(y) {
      return x + y;
    });
  })
};
assign(a.foo, [2], a.foo(2)), assign(a.foo(2), [3], "fighter");
console.log(a.foo(2)(3)); // "fighter"
console.log(a.foo(2)(5)); // 7
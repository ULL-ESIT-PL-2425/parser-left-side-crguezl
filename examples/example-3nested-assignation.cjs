const {
  assign,
  functionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function (a) {
  return functionObject(function (b) {
    return functionObject(function (c) {
      return a + b + c;
    });
  });
});

assign(foo, [2], foo(2)),
assign(foo(2), [3], foo(2)(3)),
assign(foo(2)(3), [5], "Another value");
console.log(foo(2)(3)(5)); // "Another Value". Currently returning 8.
console.log(foo(2)(3)(6)); // 11

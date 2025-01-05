const {
  assign,
  functionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function (a) {
  return functionObject(function (b) {
    return a + b;
  });
});
assign(foo, [6], foo(6));
assign(foo(6), [2], "Another value");
console.log(foo(6)(2)); // "Another Value". Currently returning 8.

const {
  assign,
  functionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function (bar) {
  return bar * 2;
});
assign(foo, [10], 5);
console.log(foo(10));
console.log(foo(40));
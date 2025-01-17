const {
  assign,
  functionObject,
  FunctionObject,
  Storage
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function foo(a) {
  return 2 * a;
});
assign(foo, [undefined], 5);
console.log(foo());
console.log(foo(3));
console.log(foo(undefined));
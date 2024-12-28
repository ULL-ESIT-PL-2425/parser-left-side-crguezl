const {
  assign,
  functionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function (a) {
  return 2 * a;
});
assign(foo, [undefined], 5);
console.log(foo());
console.log(foo(3));
console.log(foo(undefined));


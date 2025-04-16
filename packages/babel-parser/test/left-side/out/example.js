const {
  functionObject,
  mAssign
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function foo(bar) {
  return bar * 2;
});
mAssign(foo, [10], 5);
console.log(foo(10));
console.log(foo(40));
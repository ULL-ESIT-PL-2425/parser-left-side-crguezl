const {
  functionObject,
  mAssign
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function foo(bar) {
  return bar * 2;
});
mAssign(foo, [null], "changed");
console.log(foo(null)); //  "changed"
console.log(foo(5)); // 10
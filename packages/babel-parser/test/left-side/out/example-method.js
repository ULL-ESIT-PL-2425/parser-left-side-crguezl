const {
  functionObject,
  mAssign
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
let a = {
  foo: functionObject(function something(a) {
    return a;
  })
};
mAssign(a.foo, ["bar"], "fighter");
console.log(a.foo("x")); // x
console.log(a.foo("bar")); // fighter
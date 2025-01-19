const {
  assign,
  mAssign,
  functionObject,
  FunctionObject,
  Storage
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const f = functionObject(function f(x) {
  return 2 * x;
}); // TODO: Get rid of the obsolete brackets around the argument!
assign(f, [3], 0); // TODO: assign can receive a map as only second argument
console.log(f(3)); // 0
console.log(f(4)); // 8
const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const f = functionObject(function f(x) {
  return 2 * x;
});
assign(f, [new Map([[3, 0], [4, 1]])]); // TODO: Get rid of the obsolete brackets around the argument! 
console.log(f(3)); // 0
console.log(f(4)); // 1
console.log(f(5)); // 10

const {
  assign,
  mAssign,
  functionObject,
  FunctionObject,
  Storage
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
// Sets
let s = functionObject(new Set([5, 9, 10])); // Potential Syntax @@ new Set([5,9,10])
console.log(s(0)); // false
console.log(s(5)); // true
console.log(s(9)); // true
mAssign(s, [0], true);
console.log(s(0)); // true
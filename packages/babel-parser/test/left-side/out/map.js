const {
  assign,
  mAssign,
  functionObject,
  FunctionObject,
  Storage
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
// Maps
let m = new FunctionObject(new Map([[1, 2], [3, 4]])); // Potential Syntax @@ new Map([[1,2],[3,4]])
console.log(m(0)); // undefined
console.log(m(1)); // 2
console.log(m(3)); // 4
console.log(m(-1)); // undefined
mAssign(m, [0], 5);
console.log(m(0)); // 5
const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const b = [3, 2, 1];
let a = functionObject(b, {
  debug: false,
  exception: (x, e) => {
    if (typeof x == "string" && b[x] !== undefined) {
      return b[x];
    } else throw e;
  }
});
assign(a, [-1], 2);
console.log(a(-1)); // 2
console.log(a("length")); // 3
assign(a, [3], 4);
console.log(a("length")); // 3 since "b" has not changed
console.log(a.cache.size); // 2
console.log(a.cache.toString()); // [[-1,2],[3,4]]

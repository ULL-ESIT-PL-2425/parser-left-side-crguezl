const {
  assign,
  functionObject,
  FunctionObject,
  Storage
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const foo = functionObject(function foo(a) {
  return functionObject(function bar(b) {
    return functionObject(function baz(c) {
      return a + b + c;
    });
  });
});
// TODO: foo(2) is computed twice! See example-3nested-assignation.cjs. 
// It is urgent to optimize the assign function!!!!
// TODO: foo(2)(3) is computed twice! 
// More efficient translation of foo(2)(3)(5) = "Another value"
let uid3, uid2, uid1; // Declare n-1 variables with unique identifiers in the local scope

assign(foo, [2], uid3 = foo(2)),              // uid3 is a function
assign(uid3, [3], uid2 = uid3(3)),            // Save the function uid2=foo(2)(3) in the cache of uid3 = foo(2) for the entry 3
assign(uid2, [5], uid1 = "Another value");    // Save the value "Another value" in the cache of uid2 = foo(2)(3) for the entry 5
console.log(foo(2)(3)(5)); // "Another Value"
console.log(foo(2)(3)(6)); // 11
console.log(foo(1)(3)(6)); // 10
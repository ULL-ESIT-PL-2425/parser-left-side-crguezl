const {
  assign,
  functionObject,
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const s = "hello";
const ss = new FunctionObject(s);
console.log(ss(0)); // h
console.log(ss(1)); // e
console.log(ss(2)); // l
console.log(ss(3)); // l
console.log(ss(4)); // o
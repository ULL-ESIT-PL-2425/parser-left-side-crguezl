const {
  FunctionObject
} = require("@ull-esit-pl-2425/babel-plugin-left-side-support");
const s = 43;
const ss = new FunctionObject(s);
console.log(ss(0)); // 43
console.log(ss(1)); // 43
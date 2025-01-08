// Objects
let ob = functionObject({x: 4, y: 5});
console.log(ob("x")); // 4 
console.log(ob("y")); // 5
ob("z") = 0;
console.log(ob instanceof FunctionObject); // true
console.log(ob("z")); // 0
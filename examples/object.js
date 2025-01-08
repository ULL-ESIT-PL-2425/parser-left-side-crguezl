// Objects
let ob = functionObject({x: 4, y: 5});
console.log(ob("x")); 
console.log(ob("y"));
ob("z") = 0;
console.log(ob instanceof FunctionObject);
console.log(ob("z"));
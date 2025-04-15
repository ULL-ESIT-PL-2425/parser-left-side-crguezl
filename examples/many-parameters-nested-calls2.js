function @@ foo(a, b) { // FunctionObjects are currified and must be called as foo(a)(b) 
  return a+b;
}

foo(2)(3) = 1; // TODO: The call f(2,3) must be implemented
console.log(foo(2)(3)); // 1
console.log(foo(2)(5)); // 7
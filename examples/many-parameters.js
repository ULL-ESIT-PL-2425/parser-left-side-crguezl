function @@ foo(a, b) {
  return a+b;
}

foo(2)(3) = 1; 
console.log(foo(2)(3)); // 5
console.log(foo(2)(5)); // 7

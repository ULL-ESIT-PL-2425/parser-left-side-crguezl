function @@ foo(a, b) { // foo gets currified automatically
  return a+b;
}

foo(2)(3) = 1;  // TODO: Make foo(2,3) = 1 work
console.log(foo(2)(3)); // 1
console.log(foo(2)(5)); // 7

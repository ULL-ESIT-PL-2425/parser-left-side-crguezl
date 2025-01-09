// May be in the future this will be a synonim of foo(a)(b) but by now let us throw an error
function @@ foo(a, b) {
  return a+b;
}

foo(2)(3) = 5; // The call f(2,5) is not yet implemented
console.log(foo(2)(3)); // 5
console.log(foo(2)(5)); // 7

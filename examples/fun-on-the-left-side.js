function @@ f(x) { // f = fun(x) { fun(y) { x + y } },
  return function @@ g(y) {
    return x + y;
  };
}

f(2)(3) = 8, // Constant folding lab for the future 0+1, 1*8
console.log(f(2)(3)), //  8
console.log(f(2)(5))  //  7
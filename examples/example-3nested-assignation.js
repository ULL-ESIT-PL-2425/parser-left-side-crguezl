function @@ foo(a) {
  return function @@ bar(b) {
    return function @@ baz(c) {
      return a + b + c;
    }
  }
}

foo(2)(3)(5) = "Another value";
//console.log(foo(2)(3)(5)); // "Another Value". Currently returning 8.
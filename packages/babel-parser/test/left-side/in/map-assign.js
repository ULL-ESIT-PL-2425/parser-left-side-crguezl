const f = functionObject(function f(x) {
  return 2 * x;
}); // low level. Awful code.
f.cache = new Map([[3, 0], [4, 1]]);
console.log(f(3)); // 0
console.log(f(4)); // 1
console.log(f(5)); // 10

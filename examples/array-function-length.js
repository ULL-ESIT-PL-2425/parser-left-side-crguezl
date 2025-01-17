const b = [ 3, 2, 1 ];
let a = functionObject(
  b, {
    debug: false,
    exception: (x, e) => { 
      if ((typeof x == "string") && b[x] !== undefined) {
        return b[x];
      } else throw e;
  }}
); 
a(-1) = 2;  
console.log(a(-1)); // 2
console.log(a("length")); // 3
a(3) = 4;
console.log(a("length")); // 3 since "b" has not changed
console.log(a.cache.size); // 2
console.log(a.cache.toString()); // [[-1,2],[3,4]]
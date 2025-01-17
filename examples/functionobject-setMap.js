// Arrays
let a = functionObject([1,2,3]); // Potential Syntax @@ [1,2,3]
a.setCache(new Map([[3,1],[4,2],[5,3]]));
console.log(a(3));   // 1
console.log(a.getCache(4));   // 2


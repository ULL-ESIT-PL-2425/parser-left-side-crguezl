function @@f(x) {
  return 2*x;
}

mapAssign(f, new Map([[3, 0], [4,1]]));  
console.log(f(3)); // 0
console.log(f(4)); // 1
console.log(f(5)); // 10
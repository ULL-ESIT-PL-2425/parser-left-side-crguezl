function @@ foo(a) {
  return 2*a;
}
foo(undef) = 5;

console.log(foo());
console.log(foo(3));
console.log(foo(undef));
foo(10) = 5; // Must produce 'TypeError: function "foo" is not assignable.'
console.log(foo(10)); // Currently produces 20.

function foo(bar) {
  return bar * 2;
}

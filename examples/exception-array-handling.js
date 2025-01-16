let a = functionObject(
  [1,2,3], {
    debug: false,
    exception: (x, e) => { 
    console.log("handler called!", e?.message);
    return 1; 
  }}
); 
console.log(a("hello")); 

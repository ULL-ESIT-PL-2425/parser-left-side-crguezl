const { functionObject,  FunctionObject} = require("./function-object");

function assign(f, cacheArgs, cacheValue) {
  //console.log('src f', f.toString(), cacheArgs, cacheValue);
  //debugger;
  
  if (!(f instanceof FunctionObject)) {
     // TODO: move this conditional if !(...) error to the plugin before assignment and show the line number 
     throw `TypeError: Assigning to an ordinary Function. Convert to FunctionObject instead.`;
     // f = functionObject(f); // TODO: Why is that if the throw is removed, this line does not work? Because is a "value assignment" and the true "f" is not changed? It must be done at compile time?
  }
  const cacheArgument = cacheArgs[0];
  f.setCache(cacheArgument, cacheValue);
  return cacheValue; 
}

function mapAssign(f, m) { // f is a functionObject, m is a Map
  //console.log('src f', f.toString(), cacheArgs, cacheValue);
  //debugger;
  
  if (!(f instanceof FunctionObject)) {
     // TODO: move this conditional if !(...) error to the plugin before assignment and show the line number 
     throw `TypeError: Assigning to an ordinary Function. Convert to FunctionObject instead.`;
  }
  // traverse the map and assign the values to the functionObject
  m.forEach((value, key) => {
    f.setCache(key, value);
  });
  return m; 
}


module.exports = { assign, mapAssign };

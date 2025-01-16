const { functionObject,  FunctionObject} = require("./function-object");

function assign(f, cacheArgs, cacheValue) {
  //console.log('src f', f.toString(), cacheArgs, cacheValue);
  //debugger;
  
  if (!(f instanceof FunctionObject)) {
     throw `TypeError: Assigning to an ordinary Function. Convert to FunctionObject instead.`;
     // f = functionObject(f); // TODO: Why is that if the throw is removed, this line does not work? Because is a "value assignment" and the true "f" is not changed? It must be done at compile time?
  }
  const cacheArgument = cacheArgs[0];
  f.setCache(cacheArgument, cacheValue);
  return cacheValue; 
}

module.exports = { assign };

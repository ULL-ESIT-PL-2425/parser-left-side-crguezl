const { functionObject,  FunctionObject} = require("./function-object");

function assign(f, cacheArgs, cacheValue) {
  //if (f.debug) console.log('src f', f.toString(), cacheArgs, cacheValue);
  //debugger;
  
  if (!(f instanceof FunctionObject)) {
     throw `TypeError: Assigning to an ordinary Function`;
     // f = functionObject(f); // TODO: Why is that if the throw is removed, this line does not work? Because is a "value assignment" and the true "f" is not changed? It must be done at compile time?
  }
  const cacheArgument = cacheArgs[0];
  f.setCache(cacheArgument, cacheValue);
  return cacheValue; 
}

function mAssign(f, cacheArgs, cacheValue) {
  //if (f.debug) console.log('f', cacheArgs, cacheValue);
  //debugger;
  for (let i = 0; i < cacheArgs.length; i++) {
    const cacheArgument = cacheArgs[i];
    /* It is a possibility to assign both null and undefined argument values.
    if (cacheArgument == null) {
      const error = new Error(
        "Invalid null argument on left side of assignment",
      );
      throw error;
    }*/
    const next = i + 1;
    if (next == cacheArgs.length) { // the end
      //console.log("last iteration ",next, cacheArgument, cacheValue)
      if (!f.cache) {
        throw `TypeError: Assigning to an ordinary Function. Convert to FunctionObject instead.`;
        // warning f pointer modification
        f = functionObject(f);
      }
      f.setCache(cacheArgument, cacheValue);
      return cacheValue;
    }
    // If there are more arguments
    let auxF = f.getCache(cacheArgument);
    if (!f?.cache?.has(cacheArgument)) { 
      const newFunctionObject = functionObject(f.rawFunction === undefined ? f : f.rawFunction);
      f.setCache(cacheArgument, newFunctionObject);
      auxF = f.getCache(cacheArgument);
    } else if (!(auxF instanceof FunctionObject)) { // If auxF is not a FunctionObject, turn it into one. Always fallback to the original rawFunction.
      throw `TypeError: Assigning to an ordinary Function. Convert to FunctionObject instead.`;

      auxF = functionObject(f.rawFunction ? f.rawFunction : f)
    }
    f = auxF;
  }
}

module.exports = { assign, mAssign };

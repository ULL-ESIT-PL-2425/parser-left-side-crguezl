const { functionObject } = require("./function-object");

function assign(f, cacheArgs, cacheValue) {
  //console.log('src f', f.toString(), cacheArgs, cacheValue);
  //debugger;
  for (let i = 0; i < cacheArgs.length; i++) {
    const cacheArgument = cacheArgs[i];
    if (cacheArgument === null) { // Must be === to avoid undefined! See examples/undef-assignment.js
      const error = new Error(
        "Invalid null argument on left side of assignment",
      );
      throw error;
    }
    const next = i + 1;
    if (next == cacheArgs.length) {
      // the end
      if (!f.cache) {
        // warning f pointer modification
        f = functionObject(f);
      }
      f.setCache(cacheArgument, cacheValue);
      return cacheValue;
    }
    // If there are more arguments
    const auxF = functionObject(f(cacheArgument));
    f.setCache(cacheArgument, auxF);
    //console.error(`assign f.cache["${cacheArgument}"] = ${auxF}`);
    f = auxF;
  }
}

module.exports = { assign };

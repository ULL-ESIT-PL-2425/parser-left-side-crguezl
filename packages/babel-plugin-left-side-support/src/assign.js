const { functionObject } = require("./function-object");

function assign(f, cacheArgs, cacheValue) {
  //console.log('src f', f.toString(), cacheArgs, cacheValue);
  //debugger;
  
  const cacheArgument = cacheArgs[0];
  if (!f.cache) {
     // warning f pointer modification
     f = functionObject(f);
  }
  f.setCache(cacheArgument, cacheValue);
  return cacheValue; 
}

module.exports = { assign };

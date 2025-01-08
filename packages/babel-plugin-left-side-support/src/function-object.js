const debug = false;
const CallableInstance = require("callable-instance");

class StoreMap {
  // Implements the cache based on Map
  constructor() {
    this.store = new Map();
  }
  set(key, value) {
    this.store.set(key, value);
  }
  get(key) {
    return this.store.get(key);
  }
  has(key) {
    return this.store.has(key);
  }

  get size() {
    return this.store.size;
  }
}

class StoreObject {
  // Implements the cache based on Object.create(null)
  constructor() {
    this.store = Object.create(null);
  }
  set(key, value) {
    this.store[key] = value;
  }
  get(key) {
    return this.store[key];
  }
  has(key) {
    return key in this.store;
  }
  get size() {
    return Object.keys(this.store).length;
  }
}

const DefaultClass = StoreMap; // StoreObject;
class FunctionObject extends CallableInstance {
  constructor(a, cache = new DefaultClass()) {
    // CallableInstance accepts the name of the property to use as the callable
    // method.
    super("_call");
    if (a instanceof Function) {
     this.rawFunction = a;
    } else if (a instanceof Array) {
      this.rawFunction = a.at.bind(a);
    } else if (a instanceof Set) {
      this.rawFunction = a.has.bind(a);
    } else if (a instanceof Map) {
      this.rawFunction = a.get.bind(a);
    }
    else if (a instanceof Object) {
      this.rawFunction = x => a[x];
    } 
    else {
      throw new Error("Unsupported type for FunctionObject");
    }
    this.cache = cache;
    this.function = function (...args) {
      if (args.length) {
        const arg = args[0];
        // TODO: What should we do with objects? Straight up use toString?
        //if (arg instanceof Complex) {
        //    arg = arg.toString();
        //}
        if (this?.cache && this.cache.get(arg)) {
          if (debug) console.log(`Cached value! ${this.cache.get(arg)}`);
          return this.cache.get(arg);
        }
      }
      return this.rawFunction(...args);
    };
  }

  _call(arg) {
    const result = this.function(arg);
    //console.log(arg)
    //console.log(result);
    // Are we sure about this? If the underlying function is supposed to give undefined this would be wrong.
    //return (typeof result == 'undefined') ? null : result;
    return result;
  }
  
  toString() {
    return this.function.toString();
  }
  setCache(arg, value) {
    //if (arg instanceof Complex) {
    //    arg = arg.toString();
    //}
    this.cache.set(arg, value);
  }
  getCache(arg) {
    //if (arg instanceof Complex) {
    //    arg = arg.toString();
    //}
    return this.cache.get(arg);
  }
  get size() {
    return this.cache.size;
  }

}

function functionObject(a) {
  if (a instanceof FunctionObject) return a;
  return new FunctionObject(a);
}

module.exports = { functionObject, FunctionObject };

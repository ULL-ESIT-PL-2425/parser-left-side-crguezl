const debug = false;
const CallableInstance = require("callable-instance");

function isValueType(arg) {
  // Check if the argument is a primitive type (passed by value)
  return (
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'boolean' ||
    arg === null ||
    arg === undefined ||
    typeof arg === 'symbol'
  );
}

class StoreMap {
  // Implements the cache based on Map
  constructor() {
    this.store = new Map();
  }
  set(key, value) {
    if (isValueType(key)) {
      return this.store.set(key, value);
    } 
    if(key instanceof Map) {
      key.forEach((value, key) => this.store.set(key, value));
      return key;
    }
    throw new Error(`Invalid left side callexpression in assignment. An "${typeof key}" can not be used as a key in an assignment.`); 
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

  toString() {
    return JSON.stringify([...this.store]);
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

  toString() {
    return JSON.stringify(this.store);
  }
}

const safeAt = function(index) {
  if (typeof index !== 'number' || isNaN(index)) {
    throw new Error(`Invalid index "${index}"`);
  }
  return this.at(index); 
};

const safeGet = function (prop) {
  if (prop in this) {
    return this[prop];
  } else {
    throw new Error(`Property "${prop}" does not exist in the object`);
  }
}

function currying(fn) {
  const numParamsRequired = fn.length;
  function curryFactory(params) {
    return function (...args) {
      const newParams = params.concat(args);
      if (newParams.length >= numParamsRequired) {
        return fn(...newParams);
      }
      return functionObject(curryFactory(newParams));
    }
  }
  return curryFactory([]);
}

const DefaultClass = StoreMap; // StoreObject;
class FunctionObject extends CallableInstance {
  constructor(a, cache = new DefaultClass()) {
    // CallableInstance accepts the name of the property to use as the callable
    // method.
    super("_call");
    if (a instanceof Function) { // TODO: Convert to a switch?
     this.rawFunction = currying(a); // Curry function "a" and make it throw if undefined?
    } else if (a instanceof Array) {
      this.rawFunction = safeAt.bind(a);
    } else if (a instanceof Set) {
      this.rawFunction = a.has.bind(a);
    } else if (a instanceof Map) {
      this.rawFunction = a.get.bind(a);
    }
    else if (a instanceof Object) {
      this.rawFunction = safeGet.bind(a);
    } 
    else if (typeof a === 'string') {
      this.rawFunction = safeGet.bind(a);
    }
    else if (typeof a === 'number') {
      this.rawFunction = x => a
    }
    else {
      throw new Error(`Unsupported type for FunctionObject constructor: ${a}`);
    }
    this.cache = cache;
    this.function = function (...args) {
      if (args.length) {
        const arg = args[0];
        // TODO: What should we do with objects? Straight up use toString?
        //if (arg instanceof Complex) {
        //    arg = arg.toString();
        //}
        if (this?.cache && this.cache.get(arg) !== undefined) {
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

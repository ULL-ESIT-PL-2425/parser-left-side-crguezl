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
  constructor() { // TODO: new StoreMap(Map | Object | Array | Set)
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

// Set environment variable STOREOBJECT to "StoreObject" to use the StoreObject implementation
class StoreObject {
  // Implements the cache based on Object.create(null)
  constructor() {
    this.store = Object.create(null);
  }
  set(key, value) {
    if (isValueType(key)) {
      return this.store[key] = value;
    } 
    if(key instanceof Map) {
      key.forEach((value, key) => this.store[key] = value);
      return key; // Return the map
    }
    throw new Error(`Invalid left side callexpression in assignment. An "${typeof key}" can not be used as a key in an assignment.`); 
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

const DefaultClass = process.env.STOREOBJECT? StoreObject : StoreMap; 
//console.log(DefaultClass);

const safeAt = function(index) {
  if (typeof index !== 'number' || isNaN(index)) {
    throw new Error(`Invalid index "${index}" for array access`);
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

// TODO: FunctionObject constructor cache and exception parameters #5 https://github.com/ULL-ESIT-PL-2425/parser-left-side-crguezl/issues/5
//    cache =  new DefaultClass(),
//    exception = /* exception handler function (x, error) => { ... } or null */ null,
//    undef = /* undefined handler function (x, v = a(x)) => { ... } or null */ null,
//    domain = /* domain definition function (x, v = a(x)) => { ... } that returns a boolean or null */ null,
//    debug = false
class FunctionObject extends CallableInstance {   // CallableInstance accepts the name of the property to use as the callable method.

  constructor(a, options = {}) {
    options = { 
      cache : new DefaultClass(), 
      exception:  null, 
      // TODO: undef: null, 
      // TODO: domain:  null, 
      debug: false, ...options 
      // TODO: original: the original object that is being wrapped?
    };
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
      this.rawFunction = _ => a
    }
    else {
      throw new Error(`Unsupported type for FunctionObject constructor: ${a}`);
    }
    this.cache = options.cache;
    this.exception =options.exception;
    this.undef = options.undef;
    this.domain = options.domain;
    this.debug = options.debug;
    if (this.debug) console.log("in functionObject: ", this);
    this.function = function (...args) {
      if (this.debug) console.error(`FunctionObject called with ${args}`);
      if (args.length !== 1)  throw new Error(`An assignable function must be called with a single argument. Received: ${args.length} arguments instead`);
      
      const arg = args[0];
      if (this?.cache && this.cache.get(arg) !== undefined) {
        if (this.debug) console.error(`Cached value! ${this.cache.get(arg)}`);
        return this.cache.get(arg);
      }
      
      //return this.rawFunction(...args);

      try {
        return this.rawFunction(...args);
      } catch (error) {
        if (this.exception) {
          return this.exception(arg, error);
        }
        throw error;
      }
    };
  }

  _call(arg) {
    if (this.debug) console.log("in call: ",arg)
    const result = this.function(arg);
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

function functionObject(a, options) {
  if (a instanceof FunctionObject) return a;
  return new FunctionObject(a, options);
}

module.exports = { functionObject, FunctionObject };

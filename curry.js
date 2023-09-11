function curry(func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    }
  }
}

function curryAdvanced(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const sum = (a, b) => a + b;
const curriedSum = curry(sum);
module.exports = function (fn, interval, immediate) {
  var timeout;
  var context;
  var args;
  var pending;

  if (!interval) {
    return fn;
  }

  function run() {
    fn.apply(context, args);
    pending = false;
    next();
  }

  function next() {
    timeout = setTimeout(function() {
      timeout = null;
      if (pending) {
        run();
      }
    }, interval);
  }

  return function () {
    context = this;
    args = arguments;
    pending = true;

    if (timeout) {
      return;
    }

    if (immediate) {
      run();
      return;
    }

    next();
  };
};

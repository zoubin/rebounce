
module.exports = function fallingTrigger(fn, interval, once) {
  var timeout;
  var context;
  var args;
  return function () {
    context = this;
    args = arguments;

    if (timeout && once) {
      clearTimeout(timeout);
      timeout = null;
    }

    if (!timeout) {
      timeout = setTimeout(function() {
        fn.apply(context, args);
        timeout = null;
      }, interval);
    }
  };
};


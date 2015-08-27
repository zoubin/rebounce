
module.exports = function risingTrigger(fn, interval, once) {
  var timeout;
  return function () {
    if (!timeout) {
      fn.apply(this, arguments);
    } else if (once) {
      clearTimeout(timeout);
      timeout = null;
    }

    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null;
      }, interval);
    }
  };
};


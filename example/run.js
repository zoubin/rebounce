
module.exports = function (rebounce, once) {
  var last = Date.now();
  var start = last;
  var originalCalls = [];
  var rebouncedCalls = [];

  bounce(
    rebounce(function () {
      originalCalls.push(time());
    }, 100, once),
    [50, 100, 50, 50, 100, 50, 50, 50],
    function () {
      rebouncedCalls.push(time());
    },
    function () {
      var events = {};
      rebouncedCalls.forEach(function (t) {
        events[t] = { original: true };
      });
      originalCalls.forEach(function (t) {
        events[t] = events[t] || {};
        events[t].rebounced = true;
      });
      console.log(
        ['Time', 'Rebounced', 'Original'].join('\t')
      );
      console.log('-'.repeat(40));
      var origTimes = 0;
      var rebTimes = 0;
      Object.keys(events)
        .sort(function (a, b) {
          return a - b;
        })
        .forEach(function (t) {
          console.log(
            t +
            '\t' +
            (events[t].original ? (++origTimes) : '-') +
            '\t\t' +
            (events[t].rebounced ? (++rebTimes) : '-')
          );
        });
    }
  );

  function time() {
    return Date.now() - start;
  }

  function bounce(fn, times, oncall, done) {
    oncall();
    fn();
    if (times.length) {
      setTimeout(
        bounce.bind(null, fn, times.slice(1), oncall, done),
        times[0]
      );
    } else {
      setTimeout(done, 200);
    }
  }

};

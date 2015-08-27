var rebounce = require('../lib/risingTrigger');
var test = require('tap').test;

test('risingTrigger', function(t) {
  t.plan(4);

  var last = Date.now();
  var start = last;
  var originalCalls = [];
  var rebouncedCalls = [];

  bounce(
    rebounce(function () {
      rebouncedCalls.push(time());
    }, 101),
    50,
    10,
    function () {
      originalCalls.push(time());
    },
    function () {
      t.equal(originalCalls.length, 10);
      t.equal(rebouncedCalls.length, 5);
      t.ok(rebouncedCalls[0] - originalCalls[0] < 2);

      var rebouncedIntervals = [];
      rebouncedCalls.reduce(function (prev, next) {
        rebouncedIntervals.push(next - prev > 100);
        return next;
      });
      t.ok(rebouncedIntervals.every(Boolean));
    }
  );

  function time() {
    return Date.now() - start;
  }
});

function bounce(fn, interval, count, logger, done) {
  if (count--) {
    logger();
    fn();
    setTimeout(
      bounce.bind(null, fn, interval, count, logger, done),
      interval
    );
  } else {
    setTimeout(done, 200);
  }
}

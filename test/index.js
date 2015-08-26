var rebounce = require('..');
var test = require('tap').test;

test('rebounce', function(t) {
  t.plan(5);
  var last = Date.now();
  var rebouncedFn = rebounce(function () {
    var ts = Date.now();
    t.ok(ts - last > 100);
    last = ts;
  }, 101, false);
  bounce(rebouncedFn, 50, 10);
});

test('rebounce, immediate', function(t) {
  t.plan(6);
  var count = 0;
  var last = Date.now();
  var rebouncedFn = rebounce(function () {
    if (count === 0) {
      t.ok(true);
      return;
    }
    var ts = Date.now();
    t.ok(ts - last > 100);
    last = ts;
    count++;
  }, 101, true);
  bounce(rebouncedFn, 50, 10);
});

function bounce(fn, interval, count) {
  if (count--) {
    fn();
    setTimeout(bounce.bind(null, fn, interval, count), interval);
  }
}

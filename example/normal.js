var rebounce = require('..');

var start = Date.now();

console.log('Time\tFunction Executed');
bounce(
  rebounce(log, 100, true),
  50,
  10
);

function log() {
  console.log(time() + '\t' + '*rebounced');
}

function bounce(fn, interval, count, onend) {
  if (count--) {
    console.log(time() + '\t' + '-original');
    fn();
    setTimeout(
      bounce.bind(null, fn, interval, count, onend),
      interval
    );
  } else if (onend) {
    onend();
  }
}

function time() {
  return Date.now() - start;
}

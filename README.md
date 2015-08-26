# rebounce
Usefull for implementing behavior that should happen less frequently than default

## Example

### Node

```javascript
var rebounce = require('rebounce');

var start = Date.now();

console.log('Time\tFunction Executed');
bounce(
  rebounce(log, 100),
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
```

output:

```
Time  Function Executed
13    -original
66    -original
118   *rebounced
119   -original
172   -original
223   *rebounced
223   -original
277   -original
328   *rebounced
328   -original
381   -original
433   *rebounced
433   -original
487   -original
538   *rebounced
```

### browser

```html
<script src="dist/rebounce.js" type="text/javascript"></script>
<script type="text/javascript">
  window.onresize = rebounce(resize, 1000, true);
  var count = 0;
  function resize(e) {
    console.log(count++, '*'.repeat(80));
    console.log('height', window.innerHeight);
    console.log('width', window.innerWidth);
  }
</script>
```

## API

### rebounce(fn, interval, [ immediate = false ])

Creates and returns a rebounced version of the passed function that will execute `fn` only when `interval` miliseconds have elapsed since the last execution of `fn`.

Pass `true` for `immediate` to make rebounce call `fn` immediately when booted. Usually `fn` is executed once more than otherwise at the beginning.

`immediate` is set to `false`:

```
Time  Function Executed
13    -original
66    -original
118   *rebounced
119   -original
172   -original
223   *rebounced
223   -original
277   -original
328   *rebounced
328   -original
381   -original
433   *rebounced
433   -original
487   -original
538   *rebounced
```

`immediate` is set to `true`:

```
Time  Function Executed
14    -original
15    *rebounced
70    -original
120   *rebounced
120   -original
176   -original
223   *rebounced
226   -original
277   -original
326   *rebounced
327   -original
380   -original
427   *rebounced
432   -original
487   -original
529   *rebounced
```


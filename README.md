# rebounce
Usefull for implementing behavior that should happen less frequently than default.

## Example

### Node

```javascript
var rebounce = require('rebounce');

// want 
var rebounced = rebounce(original, 100)

// call `rebounced` every 50ms

function original() {
}

```

```
Time  Rebounced Original
----------------------------------------
0     called    called
56    called    -
105   called    called
157   called    -
211   called    called
266   called    -
317   called    called
372   called    -
423   called    called
476   called    -

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

### rebounce(fn, interval, [ once = false ])
Creates and returns a rebounced version of the passed function
that will execute the original `fn` when
either `fn` has not been called yet,
or `interval` miliseconds have elapsed since the last execution of `fn`.

However, if `once` is set to `true`, `fn` will be called when
either `fn` has not been called yet,
or `interval` miliseconds have elapsed since the last execution of **the rebounced version** of `fn`.

Suppose that the rebounced version will be scheduled to execute at intervals
`[50, 100, 50, 50, 100, 50, 50, 50]`,
and `interval` is set to `100`, `once` to `false`,
then the actual times of execution of `fn` and its rebounced version will be like:

```
Time  Rebounced Original
----------------------------------------
0     1         1
55    2         -
161   3         2
212   4         -
263   5         3
366   6         4
422   7         -
471   8         5
527   9         -
```

If `once` is set to `true`,

```
Time  Rebounced Original
----------------------------------------
0     1         1
53    2         -
156   3         -
157   -         2
210   4         -
266   5         -
370   6         3
422   7         -
474   8         -
529   9         -

```


### risingTrigger v.s. fallingTrigger
By default, the rebounced version executes `fn` at the beginning of the `interval`.
But you can use `rebounce.fallingTrigger` to execute `fn` at the end.

```javascript
var risingTrigger = require('rebounce');
var fallingTrigger = require('rebounce').fallingTrigger;
```

In the above example,

when using `risingTrigger`:

```
Time  Rebounced Original
----------------------------------------
0     1         1
55    2         -
161   3         2
212   4         -
263   5         3
366   6         4
422   7         -
471   8         5
527   9         -
```

when using `fallingTrigger`

```
Time  Rebounced Original
----------------------------------------
0     1         -
57    2         -
106   -         1
160   3         -
216   4         -
265   -         2
267   5         -
371   -         3
372   6         -
424   7         -
472   -         4
475   8         -
531   9         -
581   -         5
```


# API Reference

## Basic functions

### `merge(obj, ...items)`

- `obj` Object. The object to assign to.
- `items` Object(s) to assign.

This method works as `Object.assign`.

### `mergeIn(obj, refs, ...items)`

- `obj` Object. The object to assign to.
- `refs` Array | String. References.
- `items` Object(s) to assign.

This method works as `Object.assign`.


## Array functions

### `push(obj, ref, item)`

### `pushIn(obj, refs, item)`

### `shift(obj, ref)`

### `shiftIn(obj, refs)`

### `splice(obj, ref, idx, count, ...items)`

### `spliceIn(obj, refs, idx, count, ...items)`


## Advanced functions

### `ref(item)`

### `refsTo(obj, refs)`


## Types of references

Array and `.` separated strings are accepted as refs

```js
import { setIn } from 'immutable-light';

const myObject = {
  inner: {
    obj: {
      a: 1,
      b: 2
    },
    arr: [{
      x: 1,
      y: 2
    }]
  }
}

const nextObject = setIn(myObject, 'inner.obj.a', 3);
const nextObject = setIn(myObject, ['inner', 'obj', 'a'], 3);

const nextObject = setIn(myObject, 'inner.arr.0.x', 4);
const nextObject = setIn(myObject, ['inner', 'arr', 0, 'a'], 4);
```


## References

There are two types of references that can be used in methods.

- Array references of the form: `['my','nested','object']`
- String references of the form: `'my.nested.object'`

If using the string reference form together with template strings (example: ``my.${dynProp}.xyz``),
bear in mind that variables containing the `.` character might result in unexpected references.


## Return values

The return value of a value manipulating function is always a new instance of the topmost Object or Array. This is different from what you normally would expect from functions such as `splice`, which would return the removed values.

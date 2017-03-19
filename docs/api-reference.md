# API Reference

- [Basic functions](#basic-functions)
  - [set](#setobj-ref-item)
  - [setIn](#setinobj-refs-item)
  - [merge](#mergeobj-items)
  - [mergeIn](#mergeinobj-refs-items)
- [Array functions](#array-functions)
  - [push](#pusharr-ref-item)
  - [pushIn](#pushinobj-refs-item)
  - [shift](#shiftarr-ref)
  - [shiftIn](#shiftinobj-refs)
  - [splice](#splicearr-ref-idx-count-items)
  - [spliceIn](#spliceinobj-refs-idx-count-items)
- [Utility functions](#utility-functions)
  - [getIn](#getinobj-refs)
  - [has](#hasobj-ref)
  - [hasIn](#hasinobj-refs)
- [Advanced functions](#advanced-functions)
  - [ref](#refitem)
  - [refsTo](#refstoobj-refs)

## Return values

The return value of a function in `immutable-light` is a new instance of the topmost Object or Array (if nothing else is mentioned). This is different from what you normally would expect from functions such as `splice`, which would return the removed values.

## Basic functions

### `set(obj, ref, item)`

- `obj` Object. The object to set a value within.
- `ref` String. Name of the property to set.
- `item` Any. The value to set.

```js
import { set } from 'immutable-light';
const obj = {
  a: 1,
  b: 2
};
const newObj = set(obj, 'a', 2);
console.log(newObj); // { a: 2, b: 2 }
```

### `setIn(obj, refs, item)`

- `obj` Object. The object to copy and assign to.
- `refs` Array | String. References to the object to copy and assign to.
- `items` Object(s) to assign.

```js
import { setIn } from 'immutable-light';
const obj = {
  inner: {
    a: 1,
    b: 2
  }
};
const newObj = set(obj, 'inner.a', 2);
console.log(newObj); // { inner: { a: 2, b: 2 } }
```

### `merge(obj, ...items)`

- `obj` Object. The object to copy and assign to.
- `items` Object(s) to assign.

Merges objects into an object. This method works as `Object.assign`.

```js
import { merge } from 'immutable-light';
const obj = {
  a: 1,
  b: 2
};
const mergedObj = merge(obj, { a: 2 }, { c: 3 });
console.log(mergedObj); /*
{
  a: 2,
  b: 2,
  c: 3
}
*/
```

### `mergeIn(obj, refs, ...items)`

- `obj` Object. The JSON structure to operate on.
- `refs` Array | String. References to the object to copy and assign to.
- `items` Object(s) to assign.

Merges objects into a nested structure.

```js
import { mergeIn } from 'immutable-light';
const obj = {
  inner: {
    a: 1,
    b: 2
  }
};
const mergedObj = mergeIn(obj, 'inner', {
  a: 3,
  c: 3
});
console.log(mergedObj); /*
{
  inner: {
    a: 3,
    b: 2,
    c: 3
  }
}
*/
```

## Array functions

### `push(arr, item)`

- `arr` Array. The array to copy and push to.
- `item` Any. The item to push.

```js
import { push } from 'immutable-light';
const arr = [0, 1];
const newArr = push(arr, 2);
console.log(newArr); // 0, 1, 2
```

### `pushIn(obj, refs, item)`

- `obj` Object. The JSON structure to operate on.
- `refs` Array | String. References to the array to copy and push to.
- `item` Any. The item to push.


```js
const obj = {
  arr: [0, 1]
};
const newObj = pushIn(obj, 'arr', 2);
console.log(newObj); // { arr: [0, 1, 2] }
```

### `shift(arr)`

- `arr` Array. The array to copy and shift.

```js
const arr: [0, 1];
const newArr = shift(arr);
console.log(newArr); // [1]]
```

### `shiftIn(obj, refs)`

- `obj` Object. The JSON structure to operate on.
- `refs` Array | String. References to the array to copy and shift.

```js
const obj: {
  arr: [0, 1]
};
const newArr = shiftIn(obj, 'arr');
console.log(newArr); // { arr: [1] }
```


### `splice(arr, idx, count[, ...items])`

- `arr` Array. The array to copy and splice.
- `idx` Number. The index to start on.
- `count` Number. The number of items to remove.
- `items` Any. Items to add.

```js
const arr = [0, 1];
const newArr = splice(arr, 0, 1, 2);
console.log(newArr); // [2, 1]]
```

### `spliceIn(obj, refs, idx, count, ...items)`

- `obj` Object. The JSON structure to operate on.
- `refs` Array | String. References to the array to copy and splice.
- `idx` Number. The index to start on.
- `count` Number. The number of items to remove.
- `items` Any. Items to add.

```js
const obj: {
  arr: [0, 1]
};
const newArr = spliceIn(obj, 'arr', 0, 1, 2);
console.log(newArr); // { arr: [2, 1] }
```

## Utility functions

### `has(obj, ref)`

- `obj` Object. The object to check.
- `ref` String. Name of the property.

Check if a property exists within an object.

```js
import { has } from 'immutable-light';
const obj = {
  a: 1,
  b: undefined
};
console.log(has(obj, 'a')); // true
console.log(has(obj, 'b')); // true
console.log(has(obj, 'c')); // false
```

### `hasIn(obj, refs)`

- `obj` Object. The JSON structure to operate on.
- `refs` Array | String. References to the property to check for existence.

Check if a property exists within a nested structure.

```js
import { hasIn } from 'immutable-light';
const obj = {
  inner: {
    a: 1,
    b: undefined
  }
};
console.log(hasIn(obj, 'inner.a')); // true
console.log(hasIn(obj, 'inner.b')); // true
console.log(hasIn(obj, 'inner.c')); // false
```

### `getIn(obj, refs)`

- `obj` Object. The object to copy and assign to.
- `refs` Array | String. References to the object to copy and assign to.
- `items` Object(s) to assign.

Utility function to get a value within a structure. Returns a non-copied value from the original structure.

```js
import { getIn } from 'immutable-light';
const obj = {
  inner: {
    arr: [{ a: 0 }]
  }
};
const firstArrayObj = getIn(obj, ['inner', 'arr', 0]);
console.log(firstArrayObj); // { a: 0 }
```


## Advanced functions

### `ref(item)`

- `item` Object | Array.

Returns a copy of the item.


### `refsTo(obj, refs)`

- `obj` Object. The JSON structure to operate on.
- `refs` Array | String. References.

Returns a copy of the objects in the reference chain.

```js
const obj = {
  inner: {
    a: 1,
    b: 2,
    c: {},
    d: {}
  },
  arr: [0, 1]
};

const newObj = refsTo(obj, 'inner.c');
console.log(obj === newObj); // false
console.log(obj.inner === newObj.inner); // false
console.log(obj.inner.c === newObj.inner.c); // false
console.log(obj.inner.d === newObj.inner.d); // true
```

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

const nextObject1 = setIn(myObject, 'inner.obj.a', 3); // <=>
const nextObject2 = setIn(myObject, ['inner', 'obj', 'a'], 3);

const nextObject3 = setIn(myObject, 'inner.arr.0.x', 4); // <=>
const nextObject4 = setIn(myObject, ['inner', 'arr', 0, 'a'], 4);
```


## References

There are two types of references that can be used in methods.

- Array references of the form: `['my','nested','object']`
- String references of the form: `'my.nested.object'`

If using the string reference form together with template strings (example: ``my.${dynProp}.xyz``),
bear in mind that variables containing the `.` character might result in unexpected references.

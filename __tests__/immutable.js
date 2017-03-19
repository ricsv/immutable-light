import {
  getIn,
  has,
  hasIn,
  merge,
  mergeIn,
  push,
  pushIn,
  ref,
  refsTo,
  set,
  setIn,
  shift,
  shiftIn,
  splice,
  spliceIn
} from '../src/immutable';

describe('has function', () => {
  it('to have the correct properties', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined,
      d: null
    };

    expect(has(obj, 'a')).toBe(true);
    expect(has(obj, 'c')).toBe(true);
    expect(has(obj, 'd')).toBe(true);
    expect(has(obj, 'e')).toBe(false);
  });
});

describe('hasIn function', () => {
  it('to have the correct properties', () => {
    const obj = {
      inner: {
        a: 1,
        b: 2,
        c: undefined,
        d: null
      },
      arr: [0, 1]
    };

    expect(hasIn(obj, ['inner', 'a'])).toBe(true);
    expect(hasIn(obj, ['inner', 'c'])).toBe(true);
    expect(hasIn(obj, ['inner', 'd'])).toBe(true);
    expect(hasIn(obj, ['inner', 'e'])).toBe(false);
    expect(hasIn(obj, ['arr', 1])).toBe(true);
    expect(hasIn(obj, 'inner.a')).toBe(true);
    expect(hasIn(obj, 'arr.1')).toBe(true);
    expect(hasIn(obj, 'x')).toBe(false);
    expect(hasIn(obj, 'x.y.z')).toBe(false);
  });
});

describe('merge function', () => {
  it('to merge the correct properties', () => {
    const obj = {
      a: 1,
      b: 2
    };
    const mergedObj = merge(obj, { a: 2 }, { c: 3, d: {} });

    expect(mergedObj).toEqual({
      a: 2,
      b: 2,
      c: 3,
      d: {}
    });
    expect(mergedObj).not.toBe(obj);
  });
});

describe('mergeIn function', () => {
  it('to merge the correct properties', () => {
    const obj = {
      inner: {
        a: 1,
        b: 2
      },
      arr: [0, 1]
    };
    const mergedObj = mergeIn(obj, 'inner', {
      a: 3,
      c: 3
    });

    expect(mergedObj).toEqual({
      inner: {
        a: 3,
        b: 2,
        c: 3
      },
      arr: [0, 1]
    });
    expect(mergedObj).not.toBe(obj);
    expect(mergedObj.inner).not.toBe(obj.inner);
    expect(mergedObj.arr).toBe(obj.arr);
  });
});

describe('push function', () => {
  it('to return a new reference', () => {
    const arr = [0, 1];
    const newArr = push(arr, 2);

    expect(arr).toEqual([0, 1]);
    expect(newArr).toEqual([0, 1, 2]);
  });
});

describe('pushIn function', () => {
  it('to return a new reference', () => {
    const obj = {
      a: [0, 1]
    };
    const newObj = pushIn(obj, ['a'], 2);

    expect(obj).toEqual({
      a: [0, 1]
    });
    expect(newObj).toEqual({
      a: [0, 1, 2]
    });

    expect(newObj).not.toBe(obj);
    expect(newObj.a).not.toBe(obj.a);
  });
});


describe('shift function', () => {
  it('to return a new reference', () => {
    const arr = [0, 1];
    const newArr = shift(arr);

    expect(arr).toEqual([0, 1]);
    expect(newArr).toEqual([1]);
  });
});

describe('shiftIn function', () => {
  it('to return a new reference', () => {
    const obj = {
      a: [0, 1]
    };
    const newObj = shiftIn(obj, ['a']);

    expect(obj).toEqual({
      a: [0, 1]
    });
    expect(newObj).toEqual({
      a: [1]
    });

    expect(newObj).not.toBe(obj);
    expect(newObj.a).not.toBe(obj.a);
  });
});

describe('splice function', () => {
  it('to return a new reference', () => {
    const arr = [0, 1];
    const newArr = splice(arr, 0, 1, 2);

    expect(arr).toEqual([0, 1]);
    expect(newArr).toEqual([2, 1]);
  });
});

describe('spliceIn function', () => {
  it('to return a new reference', () => {
    const obj = {
      a: [0, 1]
    };
    const newObj = spliceIn(obj, ['a'], 1, 1, 2, 3);

    expect(obj).toEqual({
      a: [0, 1]
    });
    expect(newObj).toEqual({
      a: [0, 2, 3]
    });

    expect(newObj).not.toBe(obj);
    expect(newObj.a).not.toBe(obj.a);
  });
});

describe('set function', () => {
  it('to return a new reference', () => {
    const obj = {
      a: 1,
      b: 2
    };
    const newObj = set(obj, 'a', 3);

    expect(obj).toEqual({
      a: 1,
      b: 2
    });
    expect(newObj).toEqual({
      a: 3,
      b: 2
    });
  });
});

describe('setIn function', () => {
  it('to set values in a nested object', () => {
    const obj = {
      inner: {
        a: 1,
        b: 2
      },
      arr: [0, 1]
    };
    const newObj = setIn(obj, ['inner', 'a'], 3);

    expect(obj).toEqual({
      inner: {
        a: 1,
        b: 2
      },
      arr: [0, 1]
    });
    expect(newObj).toEqual({
      inner: {
        a: 3,
        b: 2
      },
      arr: [0, 1]
    });

    expect(newObj).not.toBe(obj);
    expect(newObj.inner).not.toBe(obj.inner);
    expect(newObj.inner.a).not.toBe(obj.inner.a);
    expect(newObj.inner.b).toBe(obj.inner.b);
    expect(newObj.arr).toBe(obj.arr);
  });

  it('to set values in an object', () => {
    const obj = {
      inner: {
        a: 1,
        b: 2
      },
      arr: [0, 1]
    };
    const newObj = setIn(obj, 'inner', {});

    expect(obj).toEqual({
      inner: {
        a: 1,
        b: 2
      },
      arr: [0, 1]
    });
    expect(newObj).toEqual({
      inner: {},
      arr: [0, 1]
    });
  });
});

describe('getIn function', () => {
  it('to get the correct values', () => {
    const obj = {
      inner: {
        a: 1,
        b: 2
      },
      arr: [0, 1]
    };

    expect(getIn(obj, ['inner', 'a'])).toBe(1);
    expect(getIn(obj, ['arr', 1])).toBe(1);
    expect(getIn(obj, 'inner.a')).toBe(1);
    expect(getIn(obj, 'arr.1')).toBe(1);
    expect(getIn(obj, 'x')).toBe(undefined);
    expect(getIn(obj, 'x.y.z')).toBe(undefined);
  });
});

describe('ref function', () => {
  it('to return a new object reference', () => {
    const obj = {
      a: 1,
      b: 2
    };
    const newObj = ref(obj);

    expect(obj).not.toBe(newObj);
    expect(newObj).toEqual({ a: 1, b: 2 });
  });

  it('to return a new array reference', () => {
    const arr = [0, 1];
    const newArr = ref(arr);

    expect(arr).not.toBe(newArr);
    expect(newArr).toEqual([0, 1]);
  });
});

describe('refsTo function', () => {
  it('to return new references to requested path', () => {
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

    expect(obj).not.toBe(newObj);
    expect(obj.inner).not.toBe(newObj.inner);
    expect(obj.inner.c).not.toBe(newObj.inner.c);
    expect(obj.inner.d).toBe(newObj.inner.d);
    expect(obj.arr).toBe(newObj.arr);
  });
});

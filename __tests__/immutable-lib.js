import {
  setIn
} from '../lib/immutable';

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
});

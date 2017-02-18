'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function ref(obj) {
  if (Array.isArray(obj)) {
    return obj.slice(0);
  } // Assume Object
  return _extends({}, obj);
}

function refsTo(obj, references) {
  var refs = typeof references === 'string' ? references.split('.') : references;
  var currObj = void 0;
  if (Array.isArray(obj)) {
    currObj = obj.slice(0);
  } else {
    // Assume Object
    currObj = _extends({}, obj);
  }
  var resObj = currObj;
  for (var i = 0; i < refs.length; i += 1) {
    var nextObj = currObj[refs[i]];
    if (Array.isArray(nextObj)) {
      nextObj = nextObj.slice(0);
    } else {
      // Assume Object
      nextObj = _extends({}, nextObj);
    }
    currObj[refs[i]] = nextObj;
    currObj = nextObj;
  }

  return resObj;
}

function getIn(data, references) {
  var refs = typeof references === 'string' ? references.split('.') : references;
  var dataContainer = data;

  for (var i = 0; i < refs.length; i += 1) {
    dataContainer = dataContainer[refs[i]];
    if (typeof dataContainer === 'undefined') {
      break;
    }
  }

  return dataContainer;
}

function has(obj, refKey) {
  return Object.hasOwnProperty.call(obj, refKey);
}

function hasIn(obj, references) {
  var refs = typeof references === 'string' ? references.split('.') : references;
  var currObj = obj;
  for (var i = 0; i < refs.length - 1; i += 1) {
    if (!currObj) {
      return false;
    }
    currObj = currObj[refs[i]];
  }
  var lastRef = refs[refs.length - 1];
  return Object.hasOwnProperty.call(currObj, lastRef);
}

function set(obj, refKey, value) {
  var newObj = _extends({}, obj);
  newObj[refKey] = value;
  return newObj;
}

function setIn(obj, references, value) {
  var refs = typeof references === 'string' ? references.split('.') : references;
  var refsLastExcluded = refs.length >= 2 ? refs.slice(0, refs.length - 1) : [];
  var lastRef = refs[refs.length - 1];

  var newObj = refsTo(obj, references);
  var toSet = getIn(newObj, refsLastExcluded);
  toSet[lastRef] = value;
  return newObj;
}

function push(arr, elem) {
  var newArr = arr.slice(0);
  newArr.push(elem);
  return newArr;
}

function pushIn(obj, refs, elem) {
  var newObj = refsTo(obj, refs);
  var arr = getIn(newObj, refs);
  arr.push(elem);
  return newObj;
}

function shift(arr) {
  var newArr = arr.slice(0);
  newArr.shift();
  return newArr;
}

function shiftIn(obj, refs) {
  var newObj = refsTo(obj, refs);
  var arr = getIn(newObj, refs);
  arr.shift();
  return newObj;
}

function splice(arr, idx, count) {
  var _arr$slice;

  for (var _len = arguments.length, items = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    items[_key - 3] = arguments[_key];
  }

  var newArr = (_arr$slice = arr.slice(0)).splice.apply(_arr$slice, [idx, count].concat(items));
  items.forEach(function (item) {
    return newArr.push(item);
  });
  return newArr;
}

function spliceIn(obj, refs, idx, count) {
  var newObj = refsTo(obj, refs);
  var arr = getIn(newObj, refs);

  for (var _len2 = arguments.length, items = Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
    items[_key2 - 4] = arguments[_key2];
  }

  arr.splice.apply(arr, [idx, count].concat(items));
  return newObj;
}

function merge(obj) {
  for (var _len3 = arguments.length, items = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    items[_key3 - 1] = arguments[_key3];
  }

  return _extends.apply(undefined, [{}, obj].concat(items));
}

function mergeIn(obj, refs) {
  var newObj = refsTo(obj, refs);
  var toSet = getIn(newObj, refs);

  for (var _len4 = arguments.length, items = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    items[_key4 - 2] = arguments[_key4];
  }

  _extends.apply(undefined, [toSet].concat(items));
  return newObj;
}

module.exports = {
  getIn: getIn,
  has: has,
  hasIn: hasIn,
  merge: merge,
  mergeIn: mergeIn,
  push: push,
  pushIn: pushIn,
  ref: ref,
  refsTo: refsTo,
  set: set,
  setIn: setIn,
  shift: shift,
  shiftIn: shiftIn,
  splice: splice,
  spliceIn: spliceIn
};

function ref(obj) {
  if (Array.isArray(obj)) {
    return obj.slice(0);
  } // Assume Object
  return Object.assign({}, obj);
}

function refsTo(obj, references) {
  const refs = typeof references === 'string' ? references.split('.') : references;
  let currObj;
  if (Array.isArray(obj)) {
    currObj = obj.slice(0);
  } else { // Assume Object
    currObj = Object.assign({}, obj);
  }
  const resObj = currObj;
  for (let i = 0; i < refs.length; i += 1) {
    let nextObj = currObj[refs[i]];
    if (Array.isArray(nextObj)) {
      nextObj = nextObj.slice(0);
    } else { // Assume Object
      nextObj = Object.assign({}, nextObj);
    }
    currObj[refs[i]] = nextObj;
    currObj = nextObj;
  }

  return resObj;
}

function getIn(data, references) {
  const refs = typeof references === 'string' ? references.split('.') : references;
  let dataContainer = data;

  for (let i = 0; i < refs.length; i += 1) {
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
  const refs = typeof references === 'string' ? references.split('.') : references;
  let currObj = obj;
  for (let i = 0; i < refs.length - 1; i += 1) {
    if (!currObj) {
      return false;
    }
    currObj = currObj[refs[i]];
  }
  const lastRef = refs[refs.length - 1];
  return Object.hasOwnProperty.call(currObj, lastRef);
}

function set(obj, refKey, value) {
  const newObj = Object.assign({}, obj);
  newObj[refKey] = value;
  return newObj;
}

function setIn(obj, references, value) {
  const refs = typeof references === 'string' ? references.split('.') : references;
  const refsLastExcluded = refs.length >= 2 ? refs.slice(0, refs.length - 1) : [];
  const lastRef = refs[refs.length - 1];

  const newObj = refsTo(obj, references);
  const toSet = getIn(newObj, refsLastExcluded);
  toSet[lastRef] = value;
  return newObj;
}

function push(arr, elem) {
  const newArr = arr.slice(0);
  newArr.push(elem);
  return newArr;
}

function pushIn(obj, refs, elem) {
  const newObj = refsTo(obj, refs);
  const arr = getIn(newObj, refs);
  arr.push(elem);
  return newObj;
}

function shift(arr) {
  const newArr = arr.slice(0);
  newArr.shift();
  return newArr;
}

function shiftIn(obj, refs) {
  const newObj = refsTo(obj, refs);
  const arr = getIn(newObj, refs);
  arr.shift();
  return newObj;
}

function splice(arr, idx, count, ...items) {
  const newArr = arr.slice(0);
  newArr.splice(idx, count, ...items);
  return newArr;
}

function spliceIn(obj, refs, idx, count, ...items) {
  const newObj = refsTo(obj, refs);
  const arr = getIn(newObj, refs);
  arr.splice(idx, count, ...items);
  return newObj;
}

function merge(obj, ...items) {
  return Object.assign({}, obj, ...items);
}

function mergeIn(obj, refs, ...items) {
  const newObj = refsTo(obj, refs);
  const toSet = getIn(newObj, refs);
  Object.assign(toSet, ...items);
  return newObj;
}

module.exports = {
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
};

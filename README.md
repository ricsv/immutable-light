# immutable-light

Light-weight immutability helpers that works great together with Redux.

[![Build Status](https://travis-ci.org/ricsv/immutable-light.svg?branch=master)](https://travis-ci.org/ricsv/immutable-light)
[![npm](https://badge.fury.io/js/immutable-light.svg?branch=master)](http://badge.fury.io/js/immutable-light)
[![Coverage Status](https://coveralls.io/repos/github/ricsv/immutable-light/badge.svg?branch=master)](https://coveralls.io/github/ricsv/immutable-light?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

## Motivation

The API of this library is inspired by [Immutable JS](https://github.com/facebook/immutable-js), which is a great library to enforce immutability in your Javascript code. 

Immutable-light provides a set of helper functions that will return new references for you where you'll need them. Example:

```js
import { shiftIn } from 'immutable-light';

const obj = {
  inner: {
    arr: [1, 2, 3]
  },
  inner2: {}
};
const newObj = shiftIn(obj, 'inner.arr');

console.log(newObj.inner.arr); // [2, 3]

console.log(obj === newObj); // false
console.log(obj.inner === newObj.inner); // false
console.log(obj.inner.arr === newObj.inner.arr); // false
console.log(obj.inner2 === newObj.inner2); // true
```

This means the library will keep references where it can, so keep in mind to not manipulate values in returned objects (someting that should be avoided nonetheless if using the library within a Redux reducer).

It's recommended to use the library togehter with the [no-param-reassign](http://eslint.org/docs/rules/no-param-reassign) ESLint rule.

## Usage

Install with

```
npm install --save immutable-light
```

or

```
yarn add immutable-light
```

Use by including relevant functions

```js
import { pushIn, spliceIn, mergeIn } from 'immutable-light';
```


## API reference

See [API Referencce](./docs/api-reference.md)


## Usage with Redux

This library would typically be used in reducers to simplify value manipulating operations. An example:

_my-reducer.js_
```js
import { setIn, pushIn, spliceIn } from 'immutable-light';

const initialState = {
  todos: []
};

export default function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return pushIn(state, 'todos', action.todo);
    case UPDATE_TODO:
      const idx = state.todos.filter(todo => todo.id === action.id)[0];
      return setIn(state, ['todos', idx], action.todo);
    case REMOVE_TODO:
      const idx = state.todos.filter(todo => todo.id === action.id)[0];
      return spliceIn(state, 'todos', idx, 1);
    default:
      return state;
  }
}
```

# Contributing

Fork the repository and checkout the clone with:


```
git clone git@github.com:myusername/immutable-light.git
```

To install dependencies, navigate to the directory in your shell and run:


```sh
npm install
#
# or if using yarn (recommended):
#
yarn
```

Run the following command to build:

```
npm run build
````

Test your changes by running:

```
npm run test
```

When making Pull Requests, provide some information about your code solves (bugfix / missing feature / docs fix etc.). Be sure to include relevant tests / documentation. Thanks :-)

# See also

- [Immutable JS](https://github.com/facebook/immutable-js)
- [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)
- [immutability-helper](https://github.com/kolodny/immutability-helper)

# React Redux Router w(R)apper

## Installation

    $ npm install --save rrrr

## Technologies

https://github.com/facebook/react

https://github.com/reactjs/react-redux

https://github.com/ReactTraining/react-router


## Motivation

Configuring and maintaining a `react` application with the two most popular libraries, `react-redux` and `react-router`, can be a huge pain. This package attempts to alleviate some of the headaches encountered while using the three technologies together, providing a consistent and user-friendly API.

## Usage

View a working code example here: https://github.com/dwjft/rrrr-example

A lot of the boilerplate required by `react-redux` has been removed, and a cleaner, more powerful out-of-the-box API has been provided. A lot of great work has gone in to making `react-redux` work under the hood, and we preserve that great work, but the boilerplate surrounding a `react-redux` system gets wildly out of control very fast. This package will also handle `async` actions by default.

## Props

By default, all `React` components are built with a `props` object. These fields represent the data passed in to the component allowing you to display dynamic / re-usable content.

This namespace gets polluted when using third-party libraries and their [higher-order components](https://reactjs.org/docs/higher-order-components.html). This is an obvious and deliberate side-effect of these libraries, but it can also create some confusion should you want to use a prop name that is already in use by a parent HOC. This package attempts to alert you when you are using a reserved keyword, but it cannot be guaranteed. In order to provide the best user experience, all props passed in are now hoisted to their appropriate namespaces inside the `props` object, preserving the usual requirements in the mean time.

The `props` object, by default, will have the following definition:

| Field Name | Source | Purpose |
|-------------|-------------|------------------------|
| renderProps | `developer` | These are the props you can pass through to a `compose`d Component to allow re-use of a `react-redux` connected component |
| storeProps | `react-redux` | These are the props computed by `react-redux`, allowing you to use the global `store` for storage / manipulation |
| storeActions | `react-redux` | Actions to manipulate the global `react-redux` store |
| routerProps | `react-router` | `match`, `location`, `history` provided by `react-router` |

## Actions

There are two types of actions, `synchronous`, and `asynchronous`.

### Synchronous

A synchronous action will operate in real-time, and manipulate the `react-redux` instantaneously, which will then traverse your `react` component tree and update all the props necessary.

To define a syncronous function, simply pass in a function through the `actions` compose config paramater, and call it via `props.storeActions.actionName`.

```javascript
// props.storeActions.sync('foo', 'bar', 'baz');

const actions = {
  sync: (foo, bar, baz) => ({ foo, bar, baz }),
};

compose(Component, { actions });
```

### Asynchronous

An asynchronous action refers to the action you are performing, which in most cases is a network request, but it can be any operation. Usually, your UI will want to provide user feedback to alert them something is happening in the background.

Unlike defining a synchronous function as a function, you would define your asynchronous action as an object, with the `action` key.

```javascript
// props.storeActions.asyncExample('foo', 'bar', 'baz');

const asyncExample = {
  action: (foo, bar, baz) => doSomethingAsynchronously(foo, bar, baz),
  end: ({ state, result, props }) => {
    return { loading: false, foo: 'bar', result: result.http_response };
  },
  start: ({ state }) => {
    return { loading: true, foo: 'baz' };
  },
  error: ({ result }) => ({ loading: false, error: 'something bad happened', result: result.http_status_code }),
};

compose(Component, { actions: { asyncExample } });
```

The `start`, `end`, and `error` functions do exactly what you may imagine. When the action starts, the `start` function is called, and `redux` store is updated with the function return value. When the action ends, the `end` function is called, and the `redux` store is updated with the function return value. `error` allows you to catch an error per action should something have gone wrong.

The `action` function is what you would call from within your `React` component; allowing you to pass through any arguments to relay to your asynchronous function.

### Function signatures

#### Actions

For a sync function and async `.action` function, the signature of the call are the arguments the pass in to them when you call them:

```javascript
// storeActions.sync('a', 'b', 'c');
// foo = 'a', bar = 'b', baz = 'c'
// props = { foo, bar, baz }, state = reduxState
sync = (foo, bar, baz, { props, state }) => ({ foo, bar, baz }); 

// storeActions.async('a', 'b', 'c');
// foo = 'a', bar = 'b', baz = 'c'
// notice here we cannot access the props or state object
async = {
  action: (foo, bar, baz) => ({ foo, bar, baz }),
};
```

#### start, end, error

```javascript
async = {
  action: (foo, bar, baz) => ({ foo, bar, baz }),
  // state = redux state, props = { foo, bar, baz }
  start: ({ state, props }) => ({}),
  // result = the result of the async action
  end: ({ state, props, result }) => ({}),
  // result = the error thrown when processing the action
  error: ({ state, props, result }) => ({}),
};
```

## API

### create(Component[, { defaultReduxState = {}, historyProps = {} } = {}])

This function is what you should use to initialize your `React` application. It will take care of all the context bindings and other requirements for keeping your app sync'd to both `react-router` and `react-redux`.

#### Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'rrrr';
import ReactComponent from './ReactComponent';

ReactDOM.render(
  create(ReactComponent),
  document.getElementById('root'),
);
```

### compose(Component[, config = { actions = {}, props = {} }])

Connect your Component to the `react-redux` and `react-router` data stores.

#### Usage

```javascript
import React from 'react';
import { compose } from 'rrrr';

const ReactComponent = ({
  storeActions: {
    action,
  },
  storeProps: {
    message,
  },
}) => (
  <div onClick={action}>
    <h1>Hello {message}</h1>
  </div>
);

const props = state => state; // take the current store state and map all the fields to our component directly
const actions = { action: () => ({ message: 'world' })}; // update the store state 'message' field to 'world'

export default compose(ReactComponent, { actions, props });
```

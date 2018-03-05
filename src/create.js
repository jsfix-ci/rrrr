// @package Create

import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
import reducer from './reducer';
import Router from './Router';

let history;
let store;

const create = (rootComponent, { defaultReduxState = {}, historyProps = {} } = {}) => {
  history = createBrowserHistory(historyProps);
  store = createStore(reducer, defaultReduxState);

  const Root = ({ reduxStore }) => (
    <Provider store={reduxStore}>
      <Router history={history}>
        <Route component={rootComponent} />
      </Router>
    </Provider>
  );

  return (
    <Root reduxStore={store} />
  );
};

const getHistory = () => history;
const getStore = () => store;

export default create;
export {
  getHistory,
  getStore,
};

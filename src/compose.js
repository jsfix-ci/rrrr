// @package Compose

import React from 'react';
import { Route } from 'react-router-dom';
import { connect as storeConnect } from 'react-redux';
import createMapDispatchToActions from './lib/createMapDispatchToActions';
import createMapStateToProps from './lib/createMapStateToProps';

const defaultConfig = {
  props: () => ({}),
  actions: {},
};

const compose = (component, incomingConfig = {}) => {
  const config = { ...defaultConfig, ...incomingConfig };

  const mapDispatchToActions = createMapDispatchToActions(config.actions);
  const mapStateToProps = createMapStateToProps(config.props);

  const ConnectedComponent = storeConnect(
    mapStateToProps,
    mapDispatchToActions,
  )(component);

  const ReturnComp = props => (
    <Route
      render={routerProps => (
        <ConnectedComponent
          {...props}
          renderProps={props}
          routerProps={routerProps}
          {...routerProps}
        />
      )}
    />
  );

  return ReturnComp;
};

export default compose;

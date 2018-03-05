// build out our own based on React Router allowing us to grab the history object
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/BrowserRouter.js

import React from 'react';
import { Router } from 'react-router-dom';

export default ({ children, history }) => (
  <Router history={history}>{children}</Router>
);

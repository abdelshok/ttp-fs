// Packages
import React from 'react';
import { Switch } from 'react-router-dom';
// Internal Modules
import Login from './containers/Login';
import Signup from './containers/Signup';
import MainPage from './containers/MainPage';
import AppliedRoute from './components/AppliedRoute';

const Routes = (props) => { // eslint-disable-line
  return (
    <Switch>
      <AppliedRoute path="/login" exact component={Login} props={props} />
      <AppliedRoute path="/signup" exact component={Signup} props={props} />
      <AppliedRoute path="/main" exact component={MainPage} props={props} />
    </Switch>
  );
};

export default Routes;

// Potential addition:
// Add later: NotFound component
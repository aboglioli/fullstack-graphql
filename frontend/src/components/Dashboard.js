import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../utils/PrivateRoute';
import Home from './Home';
import Login from './Login';
import Meta from './Meta';
import NotFound from './NotFound';

const Dashboard = () => {
  return (
    <main>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/meta" component={Meta} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
};

export default Dashboard;

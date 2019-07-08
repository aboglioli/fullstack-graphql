import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../utils/PrivateRoute';
import NotFound from '../NotFound';
import routes from '../routes';

const Dashboard = () => {
  return (
    <main>
      <Switch>
        {routes.map((route, i) =>
          route.private ? (
            <PrivateRoute
              key={i}
              exact={route.exact}
              path={route.path}
              render={props => (
                <route.component {...props} routes={route.routes} />
              )}
            />
          ) : (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              render={props => (
                <route.component {...props} routes={route.routes} />
              )}
            />
          ),
        )}
        <Route component={NotFound} />
      </Switch>
    </main>
  );
};

export default Dashboard;

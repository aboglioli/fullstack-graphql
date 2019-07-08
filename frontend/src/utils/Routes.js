import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const Routes = ({ routes }) => {
  console.log(routes);
  return (
    <Switch>
      {routes.map((route, i) =>
        route.private ? (
          <PrivateRoute
            key={i}
            exact={route.exact}
            path={route.path}
            redirectTo="/login"
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
    </Switch>
  );
};

Routes.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Routes;

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import User from '../context/User';

const PrivateRoute = ({ render, redirectTo, ...rest }) => {
  return (
    <User>
      {user => (
        <Route
          {...rest}
          render={props =>
            user ? (
              render(props)
            ) : (
              <Redirect
                to={{
                  pathname: redirectTo,
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </User>
  );
};

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  location: PropTypes.object,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;

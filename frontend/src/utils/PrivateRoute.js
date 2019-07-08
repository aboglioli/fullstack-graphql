import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      name
      email
    }
  }
`;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return null;

      const loggedIn = !error && data && data.me;

      return (
        <Route
          {...rest}
          render={props =>
            loggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      );
    }}
  </Query>
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default PrivateRoute;

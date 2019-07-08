import React from 'react';
import PropTypes from 'prop-types';
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

const User = ({ children }) => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return null;

      const token = localStorage.getItem('TOKEN');

      if (token && !error && data) {
        return children(data.me);
      }

      return children(loading);
    }}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;

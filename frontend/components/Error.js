import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Message from './Message';

const ERRORS_QUERY = gql`
  query errors {
    errors {
      code
      message
    }
  }
`;

const Error = ({ code }) => {
  return (
    <Query query={ERRORS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <b>Loading...</b>;
        if (error) return <b>Error</b>;

        error = data.errors.find(error => error.code === code);

        return (
          <Message error>
            {code && error ? error.message : 'Unknown error'}
          </Message>
        );
      }}
    </Query>
  );
};

Error.propTypes = {
  code: PropTypes.string,
};

export default Error;

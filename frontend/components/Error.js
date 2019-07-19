import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
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
  const { data, loading, error } = useQuery(ERRORS_QUERY);

  if (loading) {
    return <b>Loading...</b>;
  }

  if (error) {
    return <b>Error</b>;
  }

  const err = data.errors.find(error => error.code === code);

  return <Message error>{code && err ? err.message : 'Unknown error'}</Message>;
};

Error.propTypes = {
  code: PropTypes.string,
};

export default Error;

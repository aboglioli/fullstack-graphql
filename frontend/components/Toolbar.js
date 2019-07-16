import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logout } from '../utils/auth';

const Toolbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
      }}
    >
      <ApolloConsumer>
        {client => (
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: '0 1rem',
            }}
            onClick={async () => {
              await client.resetStore();
              logout();
            }}
          >
            <FontAwesomeIcon icon="power-off" />
          </button>
        )}
      </ApolloConsumer>
    </div>
  );
};

export default Toolbar;

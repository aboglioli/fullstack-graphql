import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logout } from '../utils/auth';

const Toolbar = () => {
  const client = useApolloClient();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
      }}
    >
      <button
        style={{
          background: 'none',
          border: 'none',
          padding: '0 1rem',
        }}
        onClick={async () => {
          await client.clearStore();
          await client.resetStore();
          logout();
        }}
      >
        <FontAwesomeIcon icon="power-off" />
      </button>
    </div>
  );
};

export default Toolbar;

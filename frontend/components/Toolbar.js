import React from 'react';
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
      <button
        style={{
          background: 'none',
          border: 'none',
          padding: '0 1rem',
        }}
        onClick={logout}
      >
        <FontAwesomeIcon icon="power-off" />
      </button>
    </div>
  );
};

export default Toolbar;

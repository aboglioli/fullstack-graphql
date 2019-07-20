import React from 'react';
import Link from 'next/link';
import cookie from 'js-cookie';

const Unauthorized = () => {
  cookie.remove('token');

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="box">
        <h2>Unauthorized</h2>
        <p>
          Please{' '}
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

Unauthorized.title = 'Unauthorized';
Unauthorized.disableDashboard = true;

export default Unauthorized;

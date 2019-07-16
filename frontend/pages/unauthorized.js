import React, { useEffect } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

const Unauthorized = () => {
  useEffect(() => {
    setTimeout(() => {
      cookie.remove('token');
      Router.push('/login');
    }, 3000);
  });

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
    <b>
      Unauthorized
    </b>
    </div>
  );
};

Unauthorized.title = 'Unauthorized';
Unauthorized.disableDashboard = true;

export default Unauthorized;

import Router from 'next/router';
import nextCookies from 'next-cookies';
import cookie from 'js-cookie';

export const login = token => {
  cookie.set('token', token, { expires: 1 });
  Router.push('/');
};

export const logout = () => {
  cookie.remove('token');
  Router.push('/login');
};

export const auth = ctx => {
  const { token } = nextCookies(ctx);
  const { res } = ctx;

  if (res && !token) {
    // Server
    res.writeHead(302, { Location: '/login' });
    res.end();
    return null;
  }

  if (!token) {
    Router.replace('/login');
    return null;
  }

  return token;
};

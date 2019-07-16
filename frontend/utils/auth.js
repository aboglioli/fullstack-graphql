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

export const redirect = (target, res) => {
  if (res) {
    // Server
    res.writeHead(302, { Location: target });
    res.end();
    return;
  }

  // Client
  Router.replace(target);
};

export const auth = ctx => {
  const { token } = nextCookies(ctx);
  const { res } = ctx;

  if (!token) {
    redirect('/login', res);
    return null;
  }

  return token;
};

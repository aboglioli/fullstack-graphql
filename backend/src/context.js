const { models } = require('./db');
const { getUser } = require('./utils/user');

module.exports = ({ request }) => {
  let ctx = {};

  // Get Authorization token
  const authorization = request && request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    const user = getUser(token);

    if (token && user) {
      ctx = { ...ctx, token, user };
    }
  }

  return {
    ...ctx,
    request,
    models,
  };
};

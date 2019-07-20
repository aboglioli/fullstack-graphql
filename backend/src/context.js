const { models } = require('./db');
const { getUserByToken } = require('./utils/user');

module.exports = ({ request }) => {
  let ctx = {};

  // Get Authorization token
  const authorization = request && request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    const user = getUserByToken(token);

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

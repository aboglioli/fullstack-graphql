const { getUser } = require('./utils/user');
const { models } = require('./db-mongo');

module.exports = ({ request }) => {
  const authorization = request && request.get('Authorization');

  let ctx = {};

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    const user = getUser(token);
    ctx = { token, user };
  }

  return {
    ...ctx,
    request,
    models,
  };
};

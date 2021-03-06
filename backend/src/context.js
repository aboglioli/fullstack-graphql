const { models } = require('./db');
const { getSessionId } = require('./utils/user');

module.exports = async ({ request }) => {
  let ctx = {};

  // Get Authorization token
  const authorization = request && request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    const sessionId = getSessionId(token);

    if (token && sessionId) {
      const userId = await models.Redis.get(`session:${sessionId}`);
      const user = await models.User.findById(userId);
      ctx = { ...ctx, user };
    }
  }

  return {
    ...ctx,
    request,
    models,
  };
};

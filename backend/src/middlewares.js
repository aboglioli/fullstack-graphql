const { applyMiddleware } = require('./utils/middleware');

const isLoggedIn = (resolve, root, args, ctx, info) => {
  if (!ctx.user) {
    throw new Error('NOT_LOGGED_IN');
  }

  return resolve(root, args, ctx, info);
};

const hasRole = role => async (resolve, root, args, ctx, info) => {
  const { user: loggedInUser, models } = ctx;
  const user = await models.User.findById(loggedInUser.id);

  if (user.role !== role) {
    throw new Error('USER_HAS_NOT_PERMISSIONS');
  }

  return resolve(root, args, ctx, info);
};

module.exports = [
  applyMiddleware(isLoggedIn, {
    Query: ['me'],
  }),
];

const { applyMiddleware } = require('./utils/middleware');

const isLoggedIn = (resolve, root, args, ctx, info) => {
  if (!ctx.user) {
    throw new Error('NOT_LOGGED_IN');
  }

  return resolve(root, args, ctx, info);
};

const loggedIn = applyMiddleware(
  {
    Query: ['keyValue', 'keyValueExists', 'me'],
    Mutation: ['setKeyValue', 'deleteKeyValue'],
  },
  isLoggedIn,
);

module.exports = [loggedIn];

const applyTo = ({ Query, Mutation }, middleware) => {
  Query =
    Query &&
    Query.reduce(
      (obj, resolver) => ({
        ...obj,
        [resolver]: middleware,
      }),
      {},
    );

  Mutation =
    Mutation &&
    Mutation.reduce(
      (obj, resolver) => ({
        ...obj,
        [resolver]: middleware,
      }),
      {},
    );

  return { Query, Mutation };
};

const isLoggedIn = (resolve, root, args, ctx, info) => {
  if (!ctx.user) {
    throw new Error('NOT_LOGGED_IN');
  }

  return resolve(root, args, ctx, info);
};

const loggedIn = applyTo(
  {
    Query: ['keyValue', 'keyValueExists', 'me'],
    Mutation: ['setKeyValue', 'deleteKeyValue'],
  },
  isLoggedIn,
);

module.exports = [loggedIn];

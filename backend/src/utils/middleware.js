const applyMiddleware = ({ Query, Mutation }, middleware) => {
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

module.exports = { applyMiddleware };

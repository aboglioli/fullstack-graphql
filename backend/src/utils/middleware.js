const applyMiddleware = (middleware, types) => {
  return Object.entries(types).reduce(
    (obj, [type, resolvers]) => ({
      ...obj,
      [type]: resolvers.reduce(
        (obj, resolver) => ({
          ...obj,
          [resolver]: middleware,
        }),
        {},
      ),
    }),
    {},
  );
};

const applyMiddlewares = (middlewares, types) => {
  return middlewares.map(middleware => applyMiddleware(middleware, types));
};

module.exports = { applyMiddleware, applyMiddlewares };

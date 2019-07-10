const { applyMiddleware, applyMiddlewares } = require('./middleware');

describe('Middleware utils', () => {
  test('Apply single middleware to Query and Mutation', () => {
    const res = applyMiddleware('customMiddleware', {
      Query: ['query1'],
      Mutation: ['mutation1'],
    });

    expect(res).toEqual({
      Query: {
        query1: 'customMiddleware',
      },
      Mutation: {
        mutation1: 'customMiddleware',
      },
    });
  });

  test('Apply multiple middlewares to Query and Mutation', () => {
    const res = applyMiddlewares(['middleware1', 'middleware2'], {
      Query: ['query1'],
      Mutation: ['mutation1'],
    });

    expect(res).toEqual([
      {
        Query: {
          query1: 'middleware1',
        },
        Mutation: {
          mutation1: 'middleware1',
        },
      },
      {
        Query: {
          query1: 'middleware2',
        },
        Mutation: {
          mutation1: 'middleware2',
        },
      },
    ]);
  });

  test('Apply single middleware to resolvers from Entity', () => {
    const res = applyMiddleware('customMiddleware', {
      User: ['active', 'validated'],
      Mutation: ['deletePost'],
    });

    expect(res).toEqual({
      User: {
        active: 'customMiddleware',
        validated: 'customMiddleware',
      },
      Mutation: {
        deletePost: 'customMiddleware',
      },
    });
  });

  test('Apply multiple middlewares to resolvers from Entity', () => {
    const res = applyMiddlewares(['middleware1', 'middleware2'], {
      User: ['active', 'validated'],
      Mutation: ['deletePost'],
    });

    expect(res).toEqual([
      {
        User: {
          active: 'middleware1',
          validated: 'middleware1',
        },
        Mutation: {
          deletePost: 'middleware1',
        },
      },
      {
        User: {
          active: 'middleware2',
          validated: 'middleware2',
        },
        Mutation: {
          deletePost: 'middleware2',
        },
      },
    ]);
  });
});

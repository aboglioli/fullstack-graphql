const gql = require('graphql-tag');
const Server = require('./server');
const errors = require('../src/errors');

const ERRORS_QUERY = gql`
  query errors {
    errors {
      code
      message
    }
  }
`;

const ERROR_QUERY = gql`
  query error($code: String!) {
    error(code: $code) {
      code
      message
    }
  }
`;

describe('Error', () => {
  let server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
  });

  afterAll(() => server.stop());

  test('Get all errors', async () => {
    const { errors: requestedErrors } = await server.request(ERRORS_QUERY);

    requestedErrors.forEach(error => {
      expect(error).toHaveProperty('code');
      expect(error).toHaveProperty('message');
      expect(errors[error.code]).toBe(error.message);
    });
  });

  test('Get error by code', async () => {
    const { error } = await server.request(ERROR_QUERY, {
      code: 'USER_EMAIL_INVALID',
    });
    expect(error.code).toBe('USER_EMAIL_INVALID');
    expect(error.message).toBe(errors['USER_EMAIL_INVALID']);
  });
});

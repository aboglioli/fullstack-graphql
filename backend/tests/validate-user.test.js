const gql = require('graphql-tag');
const Server = require('./server');
const seeder = require('./seeder');
const { models } = require('../src/db');

const SIGNUP_MUTATION = gql`
  mutation signup($data: UserCreateInput!) {
    signup(data: $data) {
      id
      username
      name
      email
    }
  }
`;

const getCode = userId => models.Redis.get(`validate-user:${userId}`);

describe('Validate user', () => {
  let server, user;

  beforeAll(async () => {
    server = new Server();
    await server.connectDb('validate-user');
    await server.start();

    const { signup } = await server.request(SIGNUP_MUTATION, {
      data: seeder.user,
    });
    user = signup;
  });

  test('Invalid params', async () => {
    const res = await server.fetch('/user/validate/123');
    expect(await res.text()).toBe('INVALID_PARAMS');
  });

  test('Nonexistent user', async () => {
    const res = await server.fetch('/user/validate/123?code=123');
    expect(await res.text()).toBe('USER_NOT_EXIST');
  });

  test('Generate code', async () => {
    const code = await getCode(user.id);
    expect(typeof code).toBe('string');
    expect(code.length).toBe(8);
  });

  test('Invalid code', async () => {
    const res = await server.fetch(`/user/validate/${user.id}?code=123`);
    expect(await res.text()).toBe('INVALID_CODE');
  });

  test('Validate user', async () => {
    let code = await getCode(user.id);

    let res = await server.fetch(`/user/validate/${user.id}?code=${code}`);
    expect(await res.text()).toBe('USER_VALIDATED');
  });

  test('Code deleted after validation', async () => {
    const code = await getCode(user.id);
    expect(code).toBe(null);
  });

  test('Validate already validated user', async () => {
    const res = await server.fetch(`/user/validate/${user.id}?code=123`);
    expect(await res.text()).toBe('USER_ALREADY_VALIDATED');
  });

  test('Generate validation code for validated user', async () => {
    const res = await server.fetch(`/user/generate-code/${user.id}`);
    expect(await res.text()).toBe('USER_ALREADY_VALIDATED');
  });

  test('Generate new validation code', async () => {
    const { signup: newUser } = await server.request(SIGNUP_MUTATION, {
      data: {
        username: 'new-user',
        name: 'New User',
        password: '123456',
        email: 'new-user@new-user.com',
      },
    });

    const firstCode = await models.Redis.get(`validate-user:${newUser.id}`);
    const res = await server.fetch(`/user/generate-code/${newUser.id}`);
    const secondCode = await models.Redis.get(`validate-user:${newUser.id}`);

    expect(await res.text()).toBe('VALIDATION_CODE_GENERATED');
    expect(firstCode).not.toBe(secondCode);
  });
});

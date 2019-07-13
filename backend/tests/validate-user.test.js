const fetch = require('node-fetch');
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
    const res = await fetch(`${server.host}/validate-user/123`);
    expect(await res.text()).toBe('INVALID_PARAMS');
  });

  test('Nonexistent user', async () => {
    const res = await fetch(`${server.host}/validate-user/123?code=123`);
    expect(await res.text()).toBe('USER_NOT_EXIST');
  });

  test('Generate code', async () => {
    const code = await getCode(user.id);
    expect(typeof code).toBe('string');
    expect(code.length).toBe(8);
  });

  test('Invalid code', async () => {
    const res = await fetch(`${server.host}/validate-user/${user.id}?code=123`);
    expect(await res.text()).toBe('INVALID_CODE');
  });

  test('Validate user', async () => {
    let code = await getCode(user.id);

    let res = await fetch(
      `${server.host}/validate-user/${user.id}?code=${code}`,
    );
    expect(await res.text()).toBe('USER_VALIDATED');

    // Second validation
    res = await fetch(`${server.host}/validate-user/${user.id}?code=${code}`);
    expect(await res.text()).toBe('INVALID_CODE');

    code = await getCode(user.id);
    expect(code).toBe(null);
  });
});

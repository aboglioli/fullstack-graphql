const { GraphQLClient } = require('graphql-request');
const gql = require('graphql-tag');
const Server = require('./server');
const { models } = require('../src/db');
const { checkError } = Server;

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      name
      email
      createdAt
      updatedAt
    }
  }
`;

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

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        name
        email
      }
      token
    }
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;

const newUser = {
  username: 'user',
  password: '123456',
  name: 'User',
  email: 'user@user.com',
};

describe('User', () => {
  let server;

  beforeAll(async () => {
    server = new Server();
    await server.connectDb('user');
    await server.start();
  });

  afterAll(() => server.stop());

  test('Create user with invalid data', async () => {
    await checkError(
      server.request(SIGNUP_MUTATION, {
        data: {
          ...newUser,
          username: 'adm',
        },
      }),
      'USER_INVALID',
    );

    await checkError(
      server.request(SIGNUP_MUTATION, {
        data: {
          ...newUser,
          name: 'Adm',
        },
      }),
      'USER_NAME_INVALID',
    );

    await checkError(
      server.request(SIGNUP_MUTATION, {
        data: {
          ...newUser,
          email: 'email.com',
        },
      }),
      'USER_EMAIL_INVALID',
    );

    await checkError(
      server.request(SIGNUP_MUTATION, {
        data: {
          ...newUser,
          email: 'a@a.com',
        },
      }),
      'USER_EMAIL_INVALID',
    );
  });

  test('Create user', async () => {
    const { signup: user } = await server.request(SIGNUP_MUTATION, {
      data: newUser,
    });

    expect(typeof user.id).toBe('string');
    expect(user.username).toBe(newUser.username);
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
  });

  test('User not validated after creation', async () => {
    const user = await models.User.findOne({
      username: newUser.username,
    });
    expect(user.validated).toBe(false);
  });

  test('Validate created user', async () => {
    const user = await models.User.findOne({ username: newUser.username });
    const code = await models.Redis.get(`validate-user:${user.id}`);
    expect(typeof code).toBe('string');
    expect(code.length).toBe(8);

    const res = await server.fetch(`/user/validate/${user.id}?code=${code}`);
    expect(await res.text()).toBe('USER_VALIDATED');

    const validatedUser = await models.User.findOne({
      username: newUser.username,
    });
    expect(validatedUser.validated).toBe(true);
  });

  test('Login with new user', async () => {
    const {
      login: { user, token },
    } = await server.request(LOGIN_MUTATION, {
      username: newUser.username,
      password: newUser.password,
    });

    expect(typeof token).toBe('string');
    expect(user.username).toBe(newUser.username);
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
  });

  test('Query "me"', async () => {
    await server.login('user', '123456');
    const { me } = await server.client.request(ME_QUERY);

    expect(me.username).toBe(newUser.username);
    expect(me.name).toBe(newUser.name);
    expect(me.email).toBe(newUser.email);
  });

  test('Query "me" with not logged in user', async () => {
    await checkError(server.request(ME_QUERY), 'NOT_LOGGED_IN');
  });

  test('Query "me" with malformed token', async () => {
    const client = new GraphQLClient(server.host, {
      headers: {
        Authorization: 'Bearer 123',
      },
    });

    await checkError(client.request(ME_QUERY), 'NOT_LOGGED_IN');
  });

  test('Try to change password with wrong one', async () => {
    await checkError(
      server.client.request(CHANGE_PASSWORD_MUTATION, {
        currentPassword: '777777',
        newPassword: '777777',
      }),
      'INCORRECT_PASSWORD',
    );
  });

  test('Change password with a short one', async () => {
    await checkError(
      server.client.request(CHANGE_PASSWORD_MUTATION, {
        currentPassword: '123456',
        newPassword: '7777',
      }),
      'PASSWORD_TOO_SHORT',
    );
  });

  test('Change password correctly', async () => {
    const { changePassword } = await server.client.request(
      CHANGE_PASSWORD_MUTATION,
      { currentPassword: '123456', newPassword: '777777' },
    );
    expect(changePassword).toBe(true);
  });

  test('Login with new password', async () => {
    await checkError(
      server.request(LOGIN_MUTATION, { username: 'user', password: '123456' }),
      'LOGIN_INVALID',
    );

    const { login } = await server.request(LOGIN_MUTATION, {
      username: 'user',
      password: '777777',
    });
    expect(login).toHaveProperty('token');
    expect(login).toHaveProperty('user');
    expect(login.user.username).toBe('user');
  });
});

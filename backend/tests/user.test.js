const Server = require('./server');
const seeder = require('./seeder');
const { models } = require('../src/db-mongo');
const { getError } = Server;

const SIGNUP_MUTATION = `
  mutation signup($data: UserCreateInput!) {
    signup(data: $data) {
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

const LOGIN_MUTATION = `
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

const ME_QUERY = `
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

describe('User', () => {
  let server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
    await server.connectDb('user');
  });

  afterAll(() => server.stop());

  test('Create user with invalid data', async () => {
    try {
      await server.request(SIGNUP_MUTATION, {
        data: {
          ...seeder.user,
          username: 'adm',
        },
      });
    } catch (err) {
      expect(getError(err)).toBe('USER_INVALID');
    }

    try {
      await server.request(SIGNUP_MUTATION, {
        data: {
          ...seeder.user,
          name: 'Adm',
        },
      });
    } catch (err) {
      expect(getError(err)).toBe('USER_NAME_INVALID');
    }

    try {
      await server.request(SIGNUP_MUTATION, {
        data: {
          ...seeder.user,
          email: 'email.com',
        },
      });
    } catch (err) {
      expect(getError(err)).toBe('USER_EMAIL_INVALID');
    }

    try {
      await server.request(SIGNUP_MUTATION, {
        data: {
          ...seeder.user,
          email: 'a@a.com',
        },
      });
    } catch (err) {
      expect(getError(err)).toBe('USER_EMAIL_INVALID');
    }
  });

  test('Create user', async () => {
    const { signup } = await server.request(SIGNUP_MUTATION, {
      data: seeder.user,
    });
    const { user, token } = signup;

    expect(typeof token).toBe('string');
    expect(user.username).toBe(seeder.user.username);
    expect(user.name).toBe(seeder.user.name);
    expect(user.email).toBe(seeder.user.email);
  });

  test('User not validated after creation', async () => {
    const user = await models.MongoUser.findOne({ username: seeder.user.username });
    expect(user.validated).toBe(false);

    user.validated = true;
    await user.save();
  });

  test('Login with new user', async () => {
    const { login: { user, token } } = await server.request(LOGIN_MUTATION, {
      username: seeder.user.username,
      password: seeder.user.password,
    });

    expect(typeof token).toBe('string');
    expect(user.username).toBe(seeder.user.username);
    expect(user.name).toBe(seeder.user.name);
    expect(user.email).toBe(seeder.user.email);
  });

  test('Query "me"', async () => {
    await server.login('user', '123456');
    const { me } = await server.client.request(ME_QUERY);

    expect(me.username).toBe(seeder.user.username);
    expect(me.name).toBe(seeder.user.name);
    expect(me.email).toBe(seeder.user.email);
  });
});

const Server = require('./server');
const seeder = require('./seeder');
const { getError } = require('./utils');

const signupGql = `
  mutation signup($data: UserCreateInput!) {
    signup(data: $data) {
      id
      username
      name
      email
    }
  }
`;

const loginGql = `
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

const meGql = `
  query me {
    me {
      id
      username
      name
      email
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
      await server.request(signupGql, {
        data: {
          ...seeder.user,
          username: 'adm',
        },
      });
    } catch (err) {
      expect(getError(err)).toBe('USER_INVALID');
    }

    try {
      await server.request(signupGql, {
        data: {
          ...seeder.user,
          name: 'Adm',
        },
      });
    } catch (err) {
      expect(getError(err)).toBe('USER_NAME_INVALID');
    }

    try {
      await server.request(signupGql, {
        data: {
          ...seeder.user,
          email: 'email.com',
        },
      });
    } catch (err) {
      expect(getError(err)).toBe('USER_EMAIL_INVALID');
    }

    try {
      await server.request(signupGql, {
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
    const { signup } = await server.request(signupGql, {
      data: seeder.user,
    });

    expect(signup.username).toBe(seeder.user.username);
    expect(signup.name).toBe(seeder.user.name);
    expect(signup.email).toBe(seeder.user.email);
  });
});

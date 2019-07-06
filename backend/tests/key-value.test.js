const Server = require('./server');
const seeder = require('./seeder');
const { getError } = require('./utils');
const { models } = require('../src/db');

const keyValueGql = `
  query keyValue($key: String!) {
    keyValue(key: $key) {
      key
      value
    }
  }
`;

const setKeyValueGql = `
  mutation setKeyValue($key: String!, $value: String!) {
    setKeyValue(key: $key, value: $value) {
      key
      value
    }
  }
`;

const keyValueExistsGql = `
  query keyValueExists($key: String!) {
    keyValueExists(key: $key)
  }
`;

const keyValueExistsMultipleGql = `
  query keyValueExists($key1: String!, $key2: String!) {
    exists1: keyValueExists(key: $key1)
    exists2: keyValueExists(key: $key2)
  }
`;

const deleteKeyValueGql = `
  mutation deleteKeyValue($key: String!) {
    deleteKeyValue(key: $key) {
      key
      value
    }
  }
`;

describe('KeyValue', () => {
  let server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
    await server.connectDb('key-value');

    await models.User.create({ ...seeder.user, active: true, validated: true });
    await server.login('user', '123456');
  });

  afterAll(() => server.stop());

  test('Not logged in user', async () => {
    // get
    try {
      await server.request(keyValueGql, { key: 'key' });
    } catch (err) {
      expect(getError(err)).toBe('NOT_LOGGED_IN');
    }

    // set
    try {
      await server.request(setKeyValueGql, { key: 'key', value: 'value' });
    } catch (err) {
      expect(getError(err)).toBe('NOT_LOGGED_IN');
    }
  });

  test('Create new key-value pair', async () => {
    const { setKeyValue: kv } = await server.client.request(setKeyValueGql, {
      key: 'key',
      value: 'value',
    });
    expect(kv).toEqual({ key: 'key', value: 'value' });
  });

  test('Get existing key-value pair', async () => {
    const { keyValue: kv } = await server.client.request(keyValueGql, {
      key: 'key',
    });
    expect(kv).toEqual({ key: 'key', value: 'value' });

    const { exists1, exists2 } = await server.client.request(
      keyValueExistsMultipleGql,
      { key1: 'key', key2: 'undefined' },
    );
    expect(exists1).toBe(true);
    expect(exists2).toBe(false);
  });

  test('Get non-existing key-value pair', async () => {
    const { keyValue: kv } = await server.client.request(keyValueGql, {
      key: 'undefined',
    });
    expect(kv).toEqual(null);

    const { keyValueExists: exists } = await server.client.request(
      keyValueExistsGql,
      { key: 'undefined' },
    );
    expect(exists).toBe(false);
  });

  test('Update existing key-value pair', async () => {
    const { setKeyValue: kv } = await server.client.request(setKeyValueGql, {
      key: 'key',
      value: 'new-value',
    });
    expect(kv).toEqual({ key: 'key', value: 'new-value' });
  });

  test('Delete key-value pair', async () => {
    // existing
    const { deleteKeyValue: deleted } = await server.client.request(
      deleteKeyValueGql,
      { key: 'key' },
    );
    expect(deleted).toEqual({ key: 'key', value: 'new-value' });

    // non-existing
    const { deleteKeyValue: notDeleted } = await server.client.request(
      deleteKeyValueGql,
      { key: 'key' },
    );
    expect(notDeleted).toEqual(null);
  });
});

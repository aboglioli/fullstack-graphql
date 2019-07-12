const gql = require('graphql-tag');
const Server = require('./server');

const pkg = require('../package.json');

const HEALTH_QUERY = gql`
  {
    health
  }
`;

const META_QUERY = gql`
  {
    meta {
      version
      author
      uptime
    }
  }
`;

describe('Meta', () => {
  let server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
  });

  afterAll(() => server.stop());

  test('Check information', async () => {
    const { health } = await server.request(HEALTH_QUERY);
    expect(typeof health).toBe('boolean');
    expect(health).toBe(true);
  });

  test('Retrieve information', async () => {
    const { meta } = await server.request(META_QUERY);
    expect(meta.version).toBe(pkg.version);
    expect(meta.author).toBe(pkg.author);
    expect(meta.uptime.endsWith(' seconds')).toBe(true);
  });
});

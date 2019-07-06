const Server = require('./server');

const pkg = require('../package.json');

describe('Meta', () => {
  let server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
  });

  afterAll(() => {
    server.stop();
  });

  test('Retrieve information', async () => {
    const { meta } = await server.request(
      `
      {
        meta {
          version
          author
          uptime
        }
      }
      `,
    );
    expect(meta.version).toBe(pkg.version);
    expect(meta.author).toBe(pkg.author);
    expect(meta.uptime.endsWith(' seconds')).toBe(true);
  });
});

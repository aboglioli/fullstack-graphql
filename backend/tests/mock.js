const config = require('../src/config');

if (config.mockRedis) {
  jest.mock('../src/redis', () => {
    const Redis = require('ioredis-mock');
    return new Redis();
  });
}

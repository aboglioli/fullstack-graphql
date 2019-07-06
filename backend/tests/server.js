const { GraphQLClient, request } = require('graphql-request');
const config = require('../src/config');
const db = require('../src/db-mongo');

const startServer = require('../src/server');
const { Mutation: UserMutations } = require('../src/modules/user/resolvers');

// mock redis
if (config.mockRedis) {
  jest.mock('../src/redis', () => require('redis-mock').createClient());
}

class Server {
  async start() {
    this.app = await startServer();
    const { port } = this.app.address();
    this.host = `http://localhost:${port}`;

    return this.host;
  }

  stop() {
    if (this.app) {
      this.app.close();
      return true;
    }
    return false;
  }

  async connectDb(prefix = '') {
    if (prefix) {
      config.mongoDatabase += `-${prefix}`;
    }

    await db.connect();
    await db.reset();
  }

  async login(username, password) {
    if (!this.host) {
      throw new Error('Server is not initialized');
    }
    const { token } = await UserMutations.login(
      null,
      { username, password },
      db,
    );
    this.client = new GraphQLClient(this.host, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return token;
  }

  request(graphql, variables) {
    if (!this.host) {
      throw new Error('Server is not initialized');
    }

    return variables
      ? request(this.host, graphql, variables)
      : request(this.host, graphql);
  }
}

module.exports = Server;

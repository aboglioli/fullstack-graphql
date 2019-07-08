const { GraphQLClient, request } = require('graphql-request');

const config = require('../src/config');
const mongo = require('../src/db-mongo');
const sequelize = require('../src/db-sequelize');
const startServer = require('../src/server');

// mock redis
if (config.mockRedis) {
  jest.mock('../src/redis', () => require('redis-mock').createClient());
}

class Server {
  async start() {
    this.app = await startServer();
    const { port } = this.app.address();
    this.host = `http://localhost:${port}`;
  }

  stop() {
    if (this.app) {
      this.app.close();
    }
  }

  async connectDb(prefix = '') {
    if (prefix) {
      config.mongoDatabase += `-${prefix}`;
      config.sequelizeDatabase += `-${prefix}`;
    }

    // Reset DBs
    await mongo.connect({ reset: true });
    await sequelize.connect({ reset: true });
  }

  async login(username, password) {
    if (!this.host) {
      throw new Error('Server is not initialized');
    }

    const {
      login: { token },
    } = await this.request(
      `
        mutation login ($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
          }
        }
      `,
      { username, password },
    );

    this.client = new GraphQLClient(this.host, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  request(graphql, variables) {
    if (!this.host) {
      throw new Error('Server is not initialized');
    }

    return variables
      ? request(this.host, graphql, variables)
      : request(this.host, graphql);
  }

  static getError(msg) {
    if (msg && msg.response && msg.response.errors) {
      const {
        response: { errors },
      } = msg;

      if (errors.length === 0) return '';

      const error = errors[0].message.split(' ');

      return error.length > 1 ? error[error.length - 1] : error[0];
    }

    return '';
  }
}

module.exports = Server;

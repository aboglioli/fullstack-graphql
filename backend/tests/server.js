require('./mock');
const { GraphQLClient, request } = require('graphql-request');
const fetch = require('node-fetch');

const config = require('../src/config');
const db = require('../src/db');
const startServer = require('../src/server');

class Server {
  async start() {
    this.app = await startServer();
    const { port } = this.app.address();
    this.host = `http://localhost:${port}`;
  }

  stop() {
    if (this.app) this.app.close();

    if (this.dbs && this.dbs.length > 0) {
      this.dbs.forEach(db => db.connection.close());
    }
  }

  async connectDb(prefix = '') {
    if (prefix) {
      config.mongoDatabase += `-${prefix}`;
      config.sequelizeDatabase += `-${prefix}`;
    }

    // Reset DBs
    this.dbs = await db.connect({ reset: true });
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

  fetch(uri) {
    if (!this.host) {
      throw new Error('Server is not initialized');
    }

    return fetch(`${this.host}${uri}`);
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

  static async checkError(promise, expectedError) {
    try {
      await promise;
    } catch (err) {
      expect(Server.getError(err)).toBe(expectedError);
    }
  }
}

module.exports = Server;

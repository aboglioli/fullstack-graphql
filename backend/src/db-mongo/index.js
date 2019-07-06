const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../config');

const basename = path.basename(__filename);

const models = fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .reduce((models, file) => {
    const { name, model } = require(path.join(__dirname, file));

    return {
      ...models,
      [name]: model,
    };
  }, {});

module.exports = {
  connect({ onConnected, onError, onDisconnected } = {}) {
    const {
      mongoHost: host,
      mongoPort: port,
      mongoDatabase: database,
      mongoUser: user,
      mongoPassword: password
    } = config;
    const connectionString =
      user && password
        ? `mongodb://${user}:${password}@${host}:${port}/${database}`
        : `mongodb://${host}:${port}/${database}`;

    const connection = mongoose.connect(
      `${connectionString}?authSource=admin`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    );

    onConnected &&
      mongoose.connection.on('connected', () => {
        onConnected(connectionString);
      });
    onError &&
      mongoose.connection.on('error', onError);
    onDisconnected && mongoose.connection.on('disconnected', onDisconnected);

    return connection;
  },
  async reset() {
    for (let model of models) {
      await model.deleteMany();
    }
  },
  models,
};

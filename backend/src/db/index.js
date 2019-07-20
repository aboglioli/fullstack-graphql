const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../config');
const Redis = require('../redis');

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
  async connect({ reset } = { reset: false }) {
    const {
      mongoHost: host,
      mongoPort: port,
      mongoDatabase: database,
      mongoUser: user,
      mongoPassword: password,
    } = config;
    const connectionString =
      user && password
        ? `mongodb://${user}:${password}@${host}:${port}/${database}`
        : `mongodb://${host}:${port}/${database}`;

    const connection = await mongoose.connect(
      `${connectionString}?authSource=admin`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    );

    if (reset) {
      for (let model of Object.values(models)) {
        await model.deleteMany();
      }
    }

    return connection;
  },
  models: { ...models, Redis },
};

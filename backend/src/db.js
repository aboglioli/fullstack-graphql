const { useMongo, useSequelize } = require('./config');
const mongo = require('./db-mongo');
const sequelize = require('./db-sequelize');
const KeyValue = require('./utils/key-value');

module.exports = {
  async connect({ reset } = { reset: false }) {
    const dbs = [];

    if (useMongo) {
      const connection = await mongo.connect({ reset });
      dbs.push({ name: 'mongo', connection });
    }

    if (useSequelize) {
      const connection = await sequelize.connect({ reset });

      dbs.push({ name: 'sequelize', connection });
    }

    return dbs;
  },
  sequelize: sequelize.sequelize, // comment this to ignore Sequelize
  models: {
    ...mongo.models,
    ...sequelize.models,
    KeyValue,
  },
};

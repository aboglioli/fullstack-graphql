const { useMongo, useSequelize } = require('./config');
const mongo = require('./db-mongo');
const sequelize = require('./db-sequelize');

module.exports = {
  async connect({ reset } = { reset: false }) {
    const dbs = [];

    if (useMongo) {
      await mongo.connect({ reset });
      dbs.push('mongo');
    }

    if (useSequelize) {
      await sequelize.connect({ reset });
      dbs.push('sequelize');
    }

    return dbs;
  },
  sequelize: sequelize.sequelize, // comment this to ignore Sequelize
  models: {
    ...mongo.models,
    ...sequelize.models,
  },
};

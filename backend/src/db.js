const { useMongo, useSequelize } = require('./config');
const mongo = require('./db-mongo');
const sequelize = require('./db-sequelize');
const Redis = require('./redis');

module.exports = {
  async connect({ reset } = { reset: false }) {
    const dbs = [];

    if (useMongo) {
      const connection = await mongo.connect({ reset });
      dbs.push({ name: 'Mongo', connection });
    }

    if (useSequelize) {
      const connection = await sequelize.connect({ reset });

      dbs.push({ name: 'Sequelize', connection });
    }

    if (reset) {
      await Redis.flushall();
    }

    dbs.push({
      name: 'Redis',
      connection: {
        close: () => Redis.disconnect(),
      },
    });

    return dbs;
  },
  sequelize: sequelize.sequelize,
  models: {
    ...mongo.models,
    ...sequelize.models,
    Redis,
  },
};

const mongo = require('./db-mongo');
const sequelize = require('./db-sequelize');

module.exports = {
  async connect({ reset } = { reset: false }) {
    await mongo.connect({ reset });
    await sequelize.connect({ reset });
  },
  sequelize: sequelize.sequelize,
  models: {
    ...mongo.models,
    ...sequelize.models,
  },
};

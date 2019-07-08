const startServer = require('./server');
const { sequelizeDialect } = require('./config');
const mongo = require('./db-mongo');
const sequelize = require('./db-sequelize');
const redis = require('./redis');

(async () => {
  const app = await startServer();
  console.log('[SERVER] Running on', app.address());

  // Mongo
  try {
    await mongo.connect();
    console.log('[MONGO] Connected');
  } catch (err) {
    console.log(`[MONGO] Error: ${err}`);
  }

  try {
    await sequelize.connect();
    console.log(`[SEQUELIZE] Connected to ${sequelizeDialect}`);
  } catch (err) {
    console.log(`[SEQUELIZE] Error: ${err}`);
  }

  // redis
  redis && redis.connected && console.log('[REDIS] Connected');
})();

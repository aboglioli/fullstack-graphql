const startServer = require('./server');
const mongo = require('./db-mongo');
const sequelize = require('./db-sequelize');
const redis = require('./redis');

(async () => {
  const app = await startServer();
  console.log('[SERVER] Running on', app.address());

  // Mongo
  await mongo.connect({
    onConnected: () => console.log('[MONGO] Connnected'),
    onError: err => console.log('[MONGO] Error:', err),
    onDisconnected: () => console.log('[MONGO] Disconnected'),
  });

  // Sequelize
  await sequelize.connect({
    onConnected: dialect =>
      console.log(`[SEQUELIZE] Connected to ${dialect} instance`),
    onSync: () => console.log('[SEQUELIZE] Synchronized'),
  });

  // redis
  redis && redis.connected && console.log('[REDIS] Connected');
})();

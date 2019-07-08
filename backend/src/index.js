const startServer = require('./server');
const db = require('./db');
const redis = require('./redis');

(async () => {
  const app = await startServer();
  console.log('[SERVER] Running on', app.address());

  // Connect to DBs
  try {
    await db.connect();
    console.log('[DATABASE] Connected');
  } catch (err) {
    console.log(`[DATABASE] Error: ${err}`);
  }

  // redis
  redis && redis.connected && console.log('[REDIS] Connected');
})();

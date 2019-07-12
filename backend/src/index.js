const startServer = require('./server');
const db = require('./db');
const redis = require('./redis');

(async () => {
  // Connect to DBs
  try {
    const connectedDbs = await db.connect();
    console.log(
      '[DATABASE] Connected to:',
      connectedDbs.map(db => db.name).map(db => db.toUpperCase()).join(', '),
    );
  } catch (err) {
    console.log(`[DATABASE] Error: ${err}`);
  }

  // redis
  redis && redis.connected && console.log('[REDIS] Connected');

  const app = await startServer();
  console.log('[SERVER] Running on', app.address());
})();

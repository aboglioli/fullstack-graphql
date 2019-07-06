const startServer = require('./server');
const mongo = require('./db-mongo');
const postgres = require('./db-postgres');

(async () => {
  const app = await startServer();
  console.log('[SERVER] Running on', app.address());

  // mongo
  await mongo.connect({
    onConnected: () => console.log('[MONGO] Connnected'),
    onError: err => console.log('[MONGO] Error:', err),
    onDisconnected: () => console.log('[MONGO] Disconnected'),
  });

  // postgres
  await postgres.connect({
    onConnected: () => console.log('[POSTGRES] Connected'),
    onSync: () => console.log('[POSTGRES] Synchronized'),
  });
})();

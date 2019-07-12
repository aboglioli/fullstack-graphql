const startServer = require('./server');
const db = require('./db');

(async () => {
  // Connect to DBs
  try {
    const connectedDbs = await db.connect();
    console.log(
      '[DATABASE] Connected to:',
      connectedDbs.map(db => db.name).join(', '),
    );
  } catch (err) {
    console.log(`[DATABASE] Error: ${err}`);
  }

  const app = await startServer();
  console.log('[SERVER] Running on', app.address());
})();

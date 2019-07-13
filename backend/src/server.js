const { GraphQLServer } = require('graphql-yoga');
const cors = require('cors');

const { port } = require('./config');
const context = require('./context');
const schema = require('./modules');
const middlewares = require('./middlewares');
const addRoutes = require('./routes');

const server = new GraphQLServer({
  schema,
  context,
  middlewares,
});

server.express.use(cors());

// Custom routes
addRoutes(server.express);

module.exports = () => server.start({ port });

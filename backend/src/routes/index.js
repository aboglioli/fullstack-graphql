const validateUser = require('./validate-user');

module.exports = express => {
  express.get('/validate-user/:userId', validateUser);
};

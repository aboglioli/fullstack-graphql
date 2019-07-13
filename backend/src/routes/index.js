const user = require('./user');

module.exports = express => {
  express.get('/user/validate/:userId', user.validate);
  express.get('/user/generate-code/:userId', user.generateCode);
};

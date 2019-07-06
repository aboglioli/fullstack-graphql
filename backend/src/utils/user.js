const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

function getUser(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  getUser,
};

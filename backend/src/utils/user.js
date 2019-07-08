const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

function getUser(token) {
  return jwt.verify(token, jwtSecret);
}

function generateToken(user) {
  return jwt.sign({ id: user.id }, jwtSecret);
}

module.exports = {
  getUser,
  generateToken,
};

const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

const getUser = token => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
};

const generateValidationCode = () =>
  Math.random()
    .toString()
    .slice(2, 10);

const generateAuthToken = user => {
  return jwt.sign({ id: user.id }, jwtSecret);
};

module.exports = {
  getUser,
  generateValidationCode,
  generateAuthToken,
};

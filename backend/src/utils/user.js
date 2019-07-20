const jwt = require('jsonwebtoken');

const { models } = require('../db');

const { jwtSecret } = require('../config');

const getUserByToken = token => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
};

const getUserById = async userId => {
  let user;
  try {
    user = await models.User.findById(userId);
  } catch (err) {
    throw new Error('USER_NOT_EXIST');
  }

  if (!user) {
    throw new Error('USER_NOT_EXIST');
  }

  if (user.validated) {
    throw new Error('USER_ALREADY_VALIDATED');
  }

  return user;
};

const generateValidationCode = () =>
  Math.random()
    .toString()
    .slice(2, 10);

const generateAuthToken = user => {
  return jwt.sign({ id: user.id }, jwtSecret);
};

module.exports = {
  getUserByToken,
  getUserById,
  generateValidationCode,
  generateAuthToken,
};

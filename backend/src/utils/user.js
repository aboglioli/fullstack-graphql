const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const { models } = require('../db');
const { jwtSecret } = require('../config');

const getSessionId = token => {
  try {
    const { sessionId } = jwt.verify(token, jwtSecret);
    return sessionId;
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

const generateSessionId = uuid;

const generateValidationCode = () =>
  Math.random()
    .toString()
    .slice(2, 10);

const generateAuthToken = sessionId => {
  return jwt.sign({ sessionId }, jwtSecret);
};

module.exports = {
  getSessionId,
  getUserById,
  generateSessionId,
  generateValidationCode,
  generateAuthToken,
};

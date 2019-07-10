const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize');
const { resolver } = require('graphql-sequelize');

const { models, sequelize } = require('./db');
const { getUser } = require('./utils/user');

resolver.contextToOptions = { [EXPECTED_OPTIONS_KEY]: EXPECTED_OPTIONS_KEY };

module.exports = ({ request }) => {
  let ctx = {};

  // Create DataLoader for each request
  if (sequelize) {
    ctx = {
      [EXPECTED_OPTIONS_KEY]: createContext(sequelize),
    };
  }

  // Get Authorization token
  const authorization = request && request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    const user = getUser(token);
    ctx = { ...ctx, token, user };
  }

  return {
    ...ctx,
    request,
    models,
  };
};

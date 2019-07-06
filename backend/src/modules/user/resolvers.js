const jwt = require('jsonwebtoken');

const config = require('../../config');

module.exports = {
  Query: {
    me(root, args, { user, models }) {
      return models.User.findById(user.id);
    },
  },
  Mutation: {
    async signup(root, { data }, { models }) {
      const existing = await models.User.findOne({
        $or: [{ username: data.username }, { email: data.email }],
      });
      if (existing) {
        throw new Error('USER_EXISTS');
      }

      return models.User.create(data);
    },
    async login(root, { username, password }, { models }) {
      const user = await models.User.findOne({ username });
      if (!user || !user.active) {
        throw new Error('USER_NOT_EXIST');
      }

      if (!user.validated) {
        throw new Error('USER_NOT_VALIDATED');
      }

      const correct = await user.verifyPassword(password);
      if (!correct) {
        throw new Error('LOGIN_INVALID');
      }

      const token = jwt.sign({ id: user.id }, config.jwtSecret);

      return {
        user,
        token,
      };
    },
  },
  AuthPayload: {
    user({ user }, args, { models }) {
      return models.User.findById(user.id);
    },
  },
};

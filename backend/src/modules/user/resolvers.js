const { generateToken } = require('../../utils/user');

module.exports = {
  Query: {
    me(root, args, { user, models }) {
      return models.MongoUser.findById(user.id);
    },
  },
  Mutation: {
    async signup(root, { data }, { models }) {
      const existing = await models.MongoUser.findOne({
        $or: [{ username: data.username }, { email: data.email }],
      });
      if (existing) {
        throw new Error('USER_EXISTS');
      }

      const user = await models.MongoUser.create(data);
      const token = generateToken(user);

      return { user, token };
    },
    async login(root, { username, password }, { models }) {
      const user = await models.MongoUser.findOne({ username });
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

      const token = generateToken(user);

      return { user, token };
    },
  },
  AuthPayload: {
    user({ user }, args, { models }) {
      return models.MongoUser.findById(user.id);
    },
  },
};

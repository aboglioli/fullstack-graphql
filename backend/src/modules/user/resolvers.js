const {
  generateValidationCode,
  generateAuthToken,
} = require('../../utils/user');

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

      const user = await models.User.create(data);

      // Generate validation code
      const code = generateValidationCode();
      await models.Redis.set(`validate-user:${user.id}`, code);

      return user;
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

      const token = generateAuthToken(user);

      return { user, token };
    },
  },
  AuthPayload: {
    user({ user }, args, { models }) {
      return models.User.findById(user.id);
    },
  },
};

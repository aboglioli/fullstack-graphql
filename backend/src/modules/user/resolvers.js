const config = require('../../config');
const {
  generateSessionId,
  generateValidationCode,
  generateAuthToken,
} = require('../../utils/user');
const { roles } = require('../../constants');

module.exports = {
  Query: {
    me(root, args, { user, models }) {
      return models.User.findById(user.id);
    },
    roles() {
      return roles;
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

      if (data.password.length < config.passwordMinLength) {
        throw new Error('PASSWORD_TOO_SHORT');
      }

      const user = await models.User.create({
        ...data,
        validated: !config.validateUser,
      });

      // Generate validation code
      if (config.validateUser) {
        const code = generateValidationCode();
        await models.Redis.set(`validate-user:${user.id}`, code);
      }

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

      const sessionId = generateSessionId();
      await models.Redis.set(`session:${sessionId}`, user.id);

      const token = generateAuthToken(sessionId);

      return { user, token };
    },
    async changePassword(
      root,
      { currentPassword, newPassword },
      { user, models },
    ) {
      user = await models.User.findById(user.id);

      const correct = await user.verifyPassword(currentPassword);
      if (!correct) {
        throw new Error('INCORRECT_PASSWORD');
      }

      if (newPassword.length < config.passwordMinLength) {
        throw new Error('PASSWORD_TOO_SHORT');
      }

      if (currentPassword === newPassword) {
        throw new Error('SAME_PASSWORDS');
      }

      user.password = newPassword;
      await user.save();

      return true;
    },
  },
  AuthPayload: {
    user({ user }, args, { models }) {
      return models.User.findById(user.id);
    },
  },
};

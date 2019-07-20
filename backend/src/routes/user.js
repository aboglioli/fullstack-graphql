const { validateUser } = require('../config');
const { models } = require('../db');
const { getUserById, generateValidationCode } = require('../utils/user');

const validate = async (req, res) => {
  if (!validateUser) {
    res.send('VALIDATION_NOT_ACTIVE');
    return;
  }

  const { userId } = req.params;
  const { code } = req.query;

  // Check params
  if (!userId || !code) {
    res.send('INVALID_PARAMS');
    return;
  }

  // Check user
  let user;
  try {
    user = await getUserById(userId);
  } catch (err) {
    res.send(err.message);
    return;
  }

  // Check code
  const validationCode = await models.Redis.get(`validate-user:${userId}`);
  if (!validationCode || code !== validationCode) {
    res.send('INVALID_CODE');
    return;
  }

  // Validate user
  user.validated = true;
  await user.save();

  // Remove code
  await models.Redis.del(`validate-user:${userId}`);

  res.send('USER_VALIDATED');
};

const generateCode = async (req, res) => {
  if (!validateUser) {
    res.send('VALIDATION_NOT_ACTIVE');
    return;
  }

  const { userId } = req.params;

  if (!userId) {
    res.send('INVALID_PARAMS');
    return;
  }

  try {
    await getUserById(userId);
  } catch (err) {
    res.send(err.message);
    return;
  }

  const code = generateValidationCode();
  await models.Redis.set(`validate-user:${userId}`, code);

  res.send('VALIDATION_CODE_GENERATED');
};

module.exports = {
  validate,
  generateCode,
};

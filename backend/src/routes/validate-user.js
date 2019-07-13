const { models } = require('../db');

module.exports = async (req, res) => {
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
    user = await models.User.findById(userId);
  } catch (err) {
    res.send('USER_NOT_EXIST');
    return;
  }

  if (!user) {
    res.send('USER_NOT_EXIST');
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

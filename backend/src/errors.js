const { passwordMinLength } = require('./config');

module.exports = {
  USER_INVALID: 'Invalid username',
  USER_NAME_INVALID: 'Invalid name',
  USER_EMAIL_INVALID: 'Invalid email',

  USER_EXISTS: 'Existing user',
  USER_NOT_EXIST: 'User does not exist',
  LOGIN_INVALID: 'Invalid login',

  INCORRECT_PASSWORD: 'Wrong password',
  PASSWORD_TOO_SHORT: `Password too short: ${passwordMinLength} characters at least`,
  SAME_PASSWORDS: 'Passwords are the same',

  USER_NOT_VALIDATED: 'User is not validated',
  USER_ALREADY_VALIDATED: 'User is already validated',
};

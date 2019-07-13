const { passwordMinLength } = require('./config');

module.exports = {
  USER_INVALID: 'Usuario inválido',
  USER_NAME_INVALID: 'Nombre de usuario inválido',
  USER_EMAIL_INVALID: 'Email inválido',

  USER_EXISTS: 'El usuario ya existe',
  USER_NOT_EXIST: 'El usuario no existe',
  LOGIN_INVALID: 'Credenciales inválidas',

  INCORRECT_PASSWORD: 'Contraseña incorrecta',
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${passwordMinLength} carácteres`,
};

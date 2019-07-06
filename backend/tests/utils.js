const getError = msg => {
  if (msg && msg.response && msg.response.errors) {
    const {
      response: { errors },
    } = msg;

    if (errors.length === 0) return '';

    const error = errors[0].message.split(' ');

    return error.length > 1 ? error[error.length - 1] : error[0];
  }

  return '';
};

module.exports = {
  getError,
};

const validate = value => {
  const emailRegex = /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/;
  return emailRegex.test(value);
};

module.exports = { validate };

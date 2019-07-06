const errors = require('../../errors');

module.exports = {
  Query: {
    errors() {
      return Object.keys(errors).reduce((arr, code) => {
        return [...arr, { code, message: errors[code] }];
      }, []);
    },
    error(root, { code }) {
      return { code, message: errors[code] };
    },
  },
};

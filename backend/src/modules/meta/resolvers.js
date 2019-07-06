const pkg = require('../../../package.json');

module.exports = {
  Query: {
    meta() {
      return {
        version: pkg.version,
        author: pkg.author,
        uptime: `${process.uptime().toFixed(0)} seconds`,
      };
    },
  },
};

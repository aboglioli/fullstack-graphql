const redisClient = require('../../redis');

module.exports = {
  get: key =>
    new Promise((resolve, reject) => {
      redisClient.get(key, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    }),
  set: (key, value) =>
    new Promise((resolve, reject) => {
      redisClient.set(key, value, err => {
        if (err) {
          reject(err);
        }

        resolve(value);
      });
    }),
  del: key =>
    new Promise((resolve, reject) => {
      redisClient.del(key, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result > 0);
      });
    }),
};

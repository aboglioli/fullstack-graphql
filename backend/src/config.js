require('dotenv').config();

const mergeConfig = (env1, env2) => ({ ...env1, ...env2 });

const config = {
  development: {
    logging: true,
    port: 4000,
    jwtSecret: process.env.JWT_SECRET,

    mongoHost: process.env.MONGO_HOST,
    mongoPort: process.env.MONGO_PORT,
    mongoDatabase: process.env.MONGO_DATABASE,
    mongoUser: process.env.MONGO_USER,
    mongoPassword: process.env.MONGO_PASSWORD,

    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: process.env.POSTGRES_PORT,
    postgresDatabase: process.env.POSTGRES_DATABASE,
    postgresUser: process.env.POSTGRES_USER,
    postgresPassword: process.env.POSTGRES_PASSWORD,

    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
  },
  test: {
    logging: false,
    port: 0,
    jwtSecret: 'my-secret',
    mongoDatabase: `${process.env.MONGO_DATABASE}-test`,
    postgresDatabase: `${process.env.POSTGRES_DATABASE}-test`,
    mockRedis: true,
  },
  production: {},
};

// Merge configuration with 'development'
config.test = mergeConfig(config.development, config.test);
config.production = mergeConfig(config.development, config.production);

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];

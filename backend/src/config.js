require('dotenv').config();

const mergeConfig = (env1, env2) => ({ ...env1, ...env2 });

const config = {
  development: {
    logging: false,
    port: process.env.APP_PORT,
    jwtSecret: process.env.JWT_SECRET,

    useMongo: true,
    mongoHost: process.env.MONGO_HOST,
    mongoPort: process.env.MONGO_PORT,
    mongoDatabase: process.env.MONGO_DATABASE,
    mongoUser: process.env.MONGO_USER,
    mongoPassword: process.env.MONGO_PASSWORD,

    useSequelize: true,
    sequelizeDialect: process.env.SEQUELIZE_DIALECT,
    sequelizeHost: process.env.SEQUELIZE_HOST,
    sequelizePort: process.env.SEQUELIZE_PORT,
    sequelizeDatabase: process.env.SEQUELIZE_DATABASE,
    sequelizeUser: process.env.SEQUELIZE_USER,
    sequelizePassword: process.env.SEQUELIZE_PASSWORD,

    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
  },
  test: {
    logging: false,
    port: 0,
    jwtSecret: 'my-secret',
    mongoDatabase: `${process.env.MONGO_DATABASE}-test`,
    sequelizeDialect: 'sqlite',
    sequelizeDatabase: `${process.env.SEQUELIZE_DATABASE}-test`,
    mockRedis: true,
  },
  production: {},
};

// Merge configuration with 'development'
config.test = mergeConfig(config.development, config.test);
config.production = mergeConfig(config.development, config.production);

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];

const mergeConfig = (env1, env2) => ({ ...env1, ...env2 });

const config = {
  development: {
    authEnabled: false,
  },
  test: {},
  production: {
    authEnabled: true,
  },
};

config.test = mergeConfig(config.development, config.test);
config.production = mergeConfig(config.development, config.production);

const env = process.env.NODE_ENV || 'development';

export default config[env];

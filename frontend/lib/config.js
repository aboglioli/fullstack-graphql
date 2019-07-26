const mergeConfig = (env1, env2) => ({ ...env1, ...env2 });
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    env,
    title: 'fullstack-graphql',
  },
  test: {},
  production: {},
};

config.test = mergeConfig(config.development, config.test);
config.production = mergeConfig(config.development, config.production);

export default config[env];

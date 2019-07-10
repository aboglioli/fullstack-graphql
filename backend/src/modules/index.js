const {
  mergeTypes,
  mergeResolvers,
  fileLoader,
} = require('merge-graphql-schemas');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');

const types = fileLoader(path.join(__dirname, './**/*.graphql'));
const resolvers = fileLoader(path.join(__dirname, './**/*resolvers.*'));
const schemaDirectives = require('../directives');

module.exports = makeExecutableSchema({
  typeDefs: mergeTypes(types),
  resolvers: mergeResolvers(resolvers),
  schemaDirectives,
});

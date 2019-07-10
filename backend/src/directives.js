const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = function(...args) {
      const ctx = args[2];

      if (!ctx.user) {
        throw new Error('NOT_LOGGED_IN');
      }

      return resolve.apply(this, args);
    };
  }
}

module.exports = {
  isAuth: AuthDirective,
};

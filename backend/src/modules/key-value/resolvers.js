module.exports = {
  Query: {
    keyValue(root, { key }, { user, models }) {
      return models.KeyValue.findOne({ userId: user.id, key });
    },
    keyValueExists(root, { key }, { user, models }) {
      return models.KeyValue.exists({ userId: user.id, key });
    },
  },
  Mutation: {
    async setKeyValue(root, { key, value }, { user, models }) {
      const kv = await models.KeyValue.findOne({ userId: user.id, key });

      if (kv) {
        kv.value = value;
        return kv.save();
      }

      return models.KeyValue.create({ userId: user.id, key, value });
    },
    async deleteKeyValue(root, { key }, { user, models }) {
      const kv = await models.KeyValue.findOne({ userId: user.id, key });

      if (!kv) {
        return null;
      }

      return kv.deleteOne();
    },
  },
};

const mongoose = require('mongoose');

const keyValueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = {
  name: 'KeyValue',
  model: mongoose.model('KeyValue', keyValueSchema),
};

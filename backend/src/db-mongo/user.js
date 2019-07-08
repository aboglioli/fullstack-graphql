const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { validate: validateEmail } = require('../utils/email');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, 'USER_INVALID'],
      maxlength: [20, 'USER_INVALID'],
    },
    password: { type: String, required: true },
    name: {
      type: String,
      required: true,
      minlength: [4, 'USER_NAME_INVALID'],
      maxlength: [30, 'USER_NAME_INVALID'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [8, 'USER_EMAIL_INVALID'],
      maxlength: [30, 'USER_EMAIL_INVALID'],
      validate: [validateEmail, 'USER_EMAIL_INVALID'],
      set: v => v.toLowerCase(),
    },
    active: { type: Boolean, required: true, default: true },
    validated: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = {
  name: 'MongoUser',
  model: mongoose.model('User', userSchema),
};

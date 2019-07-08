const Sequelize = require('sequelize');

class Contact extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, { sequelize });
  }
}

const schema = {
  id: {
    allowNull: false,
    primaryKey: true,
    unique: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      len: [5, 20],
    },
  },
  address: {
    type: Sequelize.STRING,
    validate: {
      len: [5, 50],
    },
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
};

module.exports = Contact;

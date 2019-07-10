const Sequelize = require('sequelize');

class Person extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, { sequelize });
  }

  static associate(models) {
    this.Contact = this.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      as: 'contact',
    });
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
  username: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true,
    validate: {
      len: [4, 20],
    },
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [4, 30],
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  validated: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

module.exports = Person;

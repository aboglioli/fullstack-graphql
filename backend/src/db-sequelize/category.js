const Sequelize = require('sequelize');

class Category extends Sequelize.Model {
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
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      len: [4, 30],
    },
  },
};

module.exports = Category;

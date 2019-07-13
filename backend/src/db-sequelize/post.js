const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, { sequelize });
  }

  static associate(models) {
    this.Category = this.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
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
  // Mongo User
  userId: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  content: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      len: [4, 144],
    },
  },
};

module.exports = Post;

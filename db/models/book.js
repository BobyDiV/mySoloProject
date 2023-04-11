'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Reader, {
        foreignKey: 'readerId',
        as: 'reader',
      });
    }
  }
  Book.init(
    {
      isbn: DataTypes.STRING,
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      linkInfo: DataTypes.STRING,
      bookCover: DataTypes.STRING,
      readerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );
  return Book;
};

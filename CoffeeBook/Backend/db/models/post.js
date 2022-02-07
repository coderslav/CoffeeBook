'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // define association here
      this.belongsTo(models.User, {uniqueKey: 'author' });
      this.hasMany(models.Comment, {uniqueKey: 'postId' });
      this.hasMany(models.UserPost, {uniqueKey: 'postId' });
      this.hasMany(models.Category, {through: 'CategoryPost', uniqueKey: 'postId' })
      this.belongsToMany(models.Category, {through: 'CategoryPost', uniqueKey: 'categoryId' })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    mediaLink: DataTypes.STRING,
    content: DataTypes.TEXT,
    author: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
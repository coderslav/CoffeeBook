'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {uniqueKey: 'userId' });
      this.belongsTo(models.Post, {uniqueKey: 'postId' });
    }
  }
  UserPost.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    vote: DataTypes.INTEGER,
    favorited: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserPost',
  });
  return UserPost;
};
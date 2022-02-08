'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Post, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'userPost' });
            this.belongsToMany(models.User, { through: 'user_friends', uniqueKey: 'userId', as: 'userFriend' });
            this.belongsToMany(models.User, { through: 'user_friends', uniqueKey: 'friendId', as: 'friendUser ' });
            this.belongsToMany(models.Category, { through: 'user_categories', uniqueKey: 'userId', as: 'userCategory' });
            this.belongsToMany(models.Post, { through: models.UserVote, uniqueKey: 'userId', as: 'userPostVote' });
            this.belongsToMany(models.Post, { through: models.PostComment, uniqueKey: 'userId', as: 'userPostComment' });
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            profilePicturePath: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
        }
    );
    return User;
};

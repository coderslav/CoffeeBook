"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Comment, { uniqueKey: "author" });
            this.hasMany(models.UserPost, { uniqueKey: "userId" });
            this.hasMany(models.Post, { uniqueKey: "author" });
            this.belongsToMany(models.User, {through: 'Friends', uniqueKey: 'UserId', as:'friend'});
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN,
            profilePicturePath: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    sequelize.sync();
    return User;
};

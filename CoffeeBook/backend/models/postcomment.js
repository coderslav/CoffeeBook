'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    PostComment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                field: 'id',
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            comment: DataTypes.TEXT,
            hasAbuse: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            vote: DataTypes.INTEGER,
            favorited: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'PostComment',
            tableName: 'post_comments',
        }
    );
    return PostComment;
};

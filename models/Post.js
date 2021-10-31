const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// define table columns and configuration
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull:  false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    content: {
      type:DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:  false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull:  false
    },  
  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Post'
  }
);

module.exports = Post;
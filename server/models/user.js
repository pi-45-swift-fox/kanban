'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email must be in format 'yourname@example.com"
        },
        notEmpty: {
          msg: "Email must be filled!"
        },
        notNull: {
          msg: "Your Email is required!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password must be filled!"
        },
        notNull: {
          msg: "Your Password is required!"
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    hooks: {
      beforeSave (user) {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
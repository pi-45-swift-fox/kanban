'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your password'
        }
      }
    },
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user, options) => {
    user.organization = 'hacktiv8';
    const encryptedPS = bcrypt.hashSync(user.password, 10)
    user.password = encryptedPS
  });
  return User;
};
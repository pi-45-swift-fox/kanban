'use strict';
const {encrypt, decrypt} = require('../Helpers/BCRYPT')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {foreignKey: "userId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate :{
        isEmail: {
          msg : 'Invalid Email' 
        },
        notEmpty: {
          msg : 'Email must be filled'
        }
      },
    },
    password: DataTypes.STRING,
    organization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    user.password = encrypt(user.password)
  });

  User.beforeCreate((user, options) => {
    user.organization = 'Hacktiv8'
  });

  // User.beforeCreate((user, options) => {
  //   user.createdAt = new Date().toDateString()
  //   user.updatedAt = new Date().toDateString()
  // });

  return User;
};
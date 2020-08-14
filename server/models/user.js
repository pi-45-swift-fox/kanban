'use strict';
const { generate } = require('../helpers/bcrypt')
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
      User.hasMany(models.Kanban, { foreignKey: "UserId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
          notEmpty: true,
          isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  }, {
    hooks: {
      beforeCreate: (User, options) => {
          User.password = generate(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
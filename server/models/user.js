'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'email tidak boleh kosong'
        },
        isEmail: {
          msg: "format email salah"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'password tidak boleh kosong'
        }

      }
    },
    organization: {
      defaultValue: "Hactiv8",
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashing(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    title:{ 
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'titel tidak boleh kosong'
        }
      }
    },
    category:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'category tidak boleh kosong'
        }
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:{
          msg:'UserId harus angka'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
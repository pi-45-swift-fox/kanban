'use strict';
const {
  Model, Sequelize
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
      Task.belongsTo(models.User,{foreignKey:'UserId'})
    }
  };
  Task.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:`Title is Empty`
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:`Category is Empty`
        }
      }
    },
    UserId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kanban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kanban.belongsTo(models.User, { foreignKey: "UserId", targetKey: "id"})
    }
  };
  Kanban.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Title cannot be null"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description cannot be empty"
        },
        notNull: {
          args: true,
          msg: "Description cannot be null"
        }
      }
    },
    tag: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (kanban) => {
        kanban.tag = 'backlog'
      }
    },
    sequelize,
    modelName: 'Kanban',
  });
  return Kanban;
};
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pig extends Model {}

Pig.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Pig;
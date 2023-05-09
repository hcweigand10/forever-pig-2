const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Farmer extends Model {}

Farmer.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lng: {
      type: DataTypes.FLOAT
    }
  },
  {
    sequelize,
  }
);

module.exports = Farmer;
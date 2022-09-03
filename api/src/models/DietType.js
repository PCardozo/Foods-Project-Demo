const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diet_type', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
      },
    },
    {
      timeStamps: false,
      createdAt:false,
      updatedAt:false,
    });
  };
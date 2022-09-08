const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique:true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Recipe',
      unique:true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Recipe summary',
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'No steps available',
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WfV7jSlBid0bag8gfj1ze2VPYqaX4PFgPw&usqp=CAU',
    },
  },
  {
    timeStamps: false,
    createdAt:false,
    updatedAt:false,
  }
  );
};

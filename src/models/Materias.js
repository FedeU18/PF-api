const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('materias', {
    
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },


  },{timestamps: false});
};
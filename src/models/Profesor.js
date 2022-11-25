const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('profesor', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull:false
    },
    username:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    descripcion:{
      type :DataTypes.TEXT,
      allowNull: true,
    },
    imagen:{
      type: DataTypes.STRING,
      // defaultValue:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
      allowNull: true
    },
    email:{
      type:DataTypes.STRING,
      allowNull: true
    },
    precio:{
      type:DataTypes.STRING,
      allowNull:true 
    },  
    puntuacion:{
      type: DataTypes.ARRAY(DataTypes.DECIMAL),      
      validate: {
        min: 1,
        max: 5,
      },
      allowNull: true

    },
    estudios:{
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
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
    username:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    contraseña:{
      type:DataTypes.STRING,
      allowNull:true,
    },

    descripcion:{
      type :DataTypes.TEXT,
      allowNull: true,
    },

    imagen:{
      type: DataTypes.STRING,
      allowNull: true
    },
    email:{
      type:DataTypes.STRING,
      allowNulls: true
    },
    pais:{
      type:DataTypes.STRING,
      allowNull:true
    },
    precio:{
      type:DataTypes.INTEGER,
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
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }

 

  });
};
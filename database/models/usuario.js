module.exports = (sequelize, dataTypes) => {
  const alias = 'usuarios';

  const cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER
    },
    nombre: {
      allowNull: false,
      type: dataTypes.STRING,
    },        
    apellido: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    telefono: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    pwd: {
      allowNull: false,
      type: dataTypes.STRING,
    },
    politicas: {
      allowNull: false,
      type: dataTypes.BOOLEAN
    },
    admin: {
      type: dataTypes.BOOLEAN
    }
  };

  const config = {
    timestamps: false
  };

  const Usuario = sequelize.define(alias, cols, config)

  return Usuario;
};

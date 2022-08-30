const carritoModel = require('./carrito')

module.exports = (sequelize, dataTypes) => {
  const alias = 'compras_productos';

  const cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER
    },
    id_carrito: {
      foreignKey: true,
      allowNull: false,
      type: dataTypes.INTEGER
    },
    total: {
      allowNull: false,
      type: dataTypes.DECIMAL,
    },
    nombre_prod: {
      allowNull: false,
      type: dataTypes.STRING
    },
    cantidad: {
      allowNull: false,
      type: dataTypes.DECIMAL
    }
  }

  const config = {
    timestamps: false
  };

  const Compra_producto = sequelize.define(alias, cols, config);
  const Carrito = carritoModel(sequelize, dataTypes);

  Carrito.belongsTo(Carrito, {
    foreignKey: 'id_carrito',
    as: 'carrito'
  });

  return Compra_producto;
}
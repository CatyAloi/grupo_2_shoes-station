'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Existencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Existencia.init({
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Existencia',
  });
  Existencia.hasOne(Model.Producto);
  Existencia.belongsTo(Model.Carrito);
  return Existencia;
};
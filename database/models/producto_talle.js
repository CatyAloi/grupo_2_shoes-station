module.exports = (sequelize, dataTypes) => {
    const alias = 'productos_talles';

    const cols = {
        id_producto: {
          type: dataTypes.INTEGER,
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        id_talle: {
          type: dataTypes.INTEGER,
        }
    }

    const config = {
        timestamps: false
    };

    const ProductosTalles = sequelize.define(alias, cols, config);

    return ProductosTalles;
}
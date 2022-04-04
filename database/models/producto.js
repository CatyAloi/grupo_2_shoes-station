const DetalleModel = require('./talle');

module.exports = (sequelize, dataTypes) => {
    const alias = 'productos';
    const productos_talles_alias = 'productos_talles';

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
        precio: {
            allowNull: false,
            type: dataTypes.DECIMAL
        },
        descuento: {
            type: dataTypes.DECIMAL
        },
        descripcion: {
            allowNull: false,
            type: dataTypes.TEXT
        },
        genero:{
            allowNull: false,
            type: dataTypes.STRING
        },
        stock: {
            allowNull: false,
            type: dataTypes.DECIMAL
        },
        img: {
            allowNull: false,
            type: dataTypes.STRING
        }
    }

    const config = {
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);
    const Talle = DetalleModel(sequelize, dataTypes);

    const ProductosTalles = sequelize.define(productos_talles_alias, {
        id_producto: {
          type: dataTypes.INTEGER,
          references: {
            model: Producto,
            key: 'id'
          }
        },
        id_talle: {
          type: dataTypes.INTEGER,
          references: {
            model: Talle,
            key: 'id'
          }
        }
    });

    Producto.belongsToMany(Talle, { through: ProductosTalles });
    Talle.belongsToMany(Producto, { through: ProductosTalles });

    return Producto;
}
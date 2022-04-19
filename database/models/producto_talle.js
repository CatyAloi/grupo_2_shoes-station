const talleModel = require('./talle');
const marcaModel = require('./marca');
const productoTalleModel = require('./producto_talle');

module.exports = (sequelize, dataTypes) => {
    const alias = 'productos';

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
        },
        id_marca: {
            allowNull: false,
            type: dataTypes.INTEGER,
        }
    }

    const config = {
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);
    const Marca = marcaModel(sequelize, dataTypes);
    const Talle = talleModel(sequelize, dataTypes);
    const ProductosTalles = productoTalleModel(sequelize, dataTypes);

    Producto.belongsTo(Marca, {
        foreignKey: 'id_marca',
    });

    Producto.belongsToMany(Talle, {
        through: ProductosTalles,
        foreignKey: 'id_producto',
    });

    Talle.belongsToMany(Producto, { 
        through: ProductosTalles,
        foreignKey: 'id_talle',
    });

    return Producto;
}

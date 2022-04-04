const usuarioModel = require('./usuario');

module.exports = (sequelize, dataTypes) => {
    const alias = 'carritos';

    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        id_usuario: {
            foreignKey: true,
            allowNull: false,
            type: dataTypes.INTEGER
        },
        codigo: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        total_compra: {
            allowNull: false,
            type: dataTypes.DECIMAL
        }
    }

    const config = {
        timestamps: false
    };

    const Carrito = sequelize.define(alias, cols, config);
    const Usuario = usuarioModel(sequelize, dataTypes);

    Carrito.belongsTo(Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
    });

    return Carrito;
}
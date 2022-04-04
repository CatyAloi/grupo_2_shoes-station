module.exports = (sequelize, dataTypes) => {
    let alias = 'usuarios';

    let cols = {
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
            allowNull: false,
            type: dataTypes.BOOLEAN
        }
    };

    let config = {
        timestamps: false
    };

    const Usuario = sequelize.define(alias, cols, config)

    return Usuario;
};

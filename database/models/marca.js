module.exports = (sequelize, dataTypes) => {
    const alias = 'marcas';

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
        img: {
            allowNull: false,
            type: dataTypes.STRING,
        }
    } 

    const config = {
        timestamps: false
    };

    const Marca = sequelize.define(alias, cols, config);

    return Marca;
}
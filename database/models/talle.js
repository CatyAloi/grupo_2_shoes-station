module.exports = (sequelize, dataTypes) => {
  const alias = 'talles';

  const cols = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER
    },
    numero: {
      allowNull: false,
      type: dataTypes.INTEGER
    }
  }

  const config = {
    timestamps: false
  };

  const Talles = sequelize.define(alias, cols, config);

  return Talles;
}
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data');
let productsJson = JSON.parse(fs.readFileSync(dataPath + '/productsData.json', 'utf-8'));

const producto_Model = {
  borrarProducto: (productoId) => {
    const listadoActualizado = productsJson.filter(producto => producto.id !== parseInt(productoId));
    console.log({ productoId });
    console.log(`Original ${productsJson.length}, final ${listadoActualizado.length}`);
    const updatedProducts = JSON.stringify(listadoActualizado, null, 2);
    fs.writeFileSync('./data/productsData.json', updatedProducts);
    productsJson = listadoActualizado;
    return listadoActualizado;
  }
};

module.exports = producto_Model;
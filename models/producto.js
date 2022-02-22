const fs = require('fs'); 

const producto_Model = {
    cargarProductos: () => JSON.parse(fs.readFileSync('./models/productos.json', { encoding: 'utf8'})),
    borrarProducto: (productoId) => {
        const listado = producto_Model.cargarProductos().productos;
        const listadoActualizado = listado.filter(producto => parseInt(producto.id) !== parseInt(productoId));
        console.log({ productoId });
        console.log(`Original ${listado.length}, final ${listadoActualizado.length}`);
        fs.writeFileSync('./models/productos.json', JSON.stringify({ productos: listadoActualizado }, null, 4));
    }
};

module.exports = producto_Model;
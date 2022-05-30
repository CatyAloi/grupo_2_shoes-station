const Paginador = require('./../utils/Paginador');

const IndexController = {

    index: (req, res) => {

        const productosDePrueba = [
            {nombre: 'Producto 1', precio: '$100'},
            {nombre: 'Producto 2', precio: '$200'},
            {nombre: 'Producto 3', precio: '$300'},
            {nombre: 'Producto 4', precio: '$400'},
            {nombre: 'Producto 5', precio: '$500'},
            {nombre: 'Producto 6', precio: '$600'},
            {nombre: 'Producto 7', precio: '$700'},
            {nombre: 'Producto 8', precio: '$800'},    
        ];

        const objetosporPagina = 2;
        const paginador = new Paginador(productosDePrueba, objetosporPagina);
        
        const pagina_actual = req.query.pagina || 1;

        const elementos = paginador.obtenerPagina(pagina_actual);
        const paginaActual = pagina_actual;
        const paginaAnterior = paginador.obtenerPaginaAnterior(pagina_actual);
        const paginaSiguiente = paginador.obtenerPaginaSiguiente(pagina_actual);
        const paginasTotales = paginador.obtenerCantidadDePaginas();
        
        res.render('index', 
            {
                elementos, 
                paginaActual, 
                paginasTotales, 
                paginaAnterior, 
                paginaSiguiente
            });
    }
}

module.exports = IndexController;

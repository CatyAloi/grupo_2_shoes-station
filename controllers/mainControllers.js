const modelProductos = require('../models/producto'); 

module.exports = {
    home: (req, res)=> {
        const listaProductos = modelProductos.cargarProductos().productos
        const data = [
            {
                titulo: 'Más Vendidos',
                productos: listaProductos
            },
            {
                titulo: 'Recomendados para Vos',
                productos: listaProductos
            },
            {
                titulo: 'Ofertas',
                productos: listaProductos
            }
        ];

        const marcas = [];
        res.render('pages/home', { data, marcas });
    },
    contacto: (req, res)=> {
        res.render('pages/form_contact');
    }

};
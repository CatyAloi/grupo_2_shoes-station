const listaProductos = require('../models/data');

module.exports = {
    home: (req, res)=> {
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
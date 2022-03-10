const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const productsJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    home: (req, res)=> {
        const data = [
            {
                titulo: 'Más Vendidos',
                productos: productsJson
            },
            {
                titulo: 'Recomendados para Vos',
                productos: productsJson
            },
            {
                titulo: 'Ofertas',
                productos: productsJson
            }
        ];

        const marcas = [];
        res.render('pages/home', { data, marcas, usuario: req.session.userLogged });
    },
    contacto: (req, res)=> {
        res.render('pages/form_contact', { usuario: req.session.userLogged });
    },
    terminos: (req, res)=> {
        res.render('pages/terminos_condiciones');
    },

    privacidad: (req, res)=> {
        res.render('pages/politicas_privacidad');
    },

    nosotros: (req, res)=> {
        res.render('pages/nosotros');
    },

    metodos_pago: (req, res)=> {
        res.render('pages/metodos_pago');
    }
};
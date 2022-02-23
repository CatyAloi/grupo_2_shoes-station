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
        res.render('pages/home', { data, marcas });
    },
    contacto: (req, res)=> {
        res.render('pages/form_contact');
    }
};
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const db = require('../database/models');
const { pbkdf2 } = require('crypto');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const productsJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    home: (req, res)=> {

        const data = [
            
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

    processContact: (req,res)=>{
        const resultContact = validationResult(req);
        if (resultContact.errors){
            return res.render ('pages/form_contact', {errors : resultContact.mapped(), oldData: req.body});
        } 

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
const bcrypt = require('bcryptjs/dist/bcrypt');
const fs = require('fs');
const path = require('path');
const { validationResult } = require ('express-validator');
const usuariosFilePath = path.join(__dirname, '../data/usersData.json');
const usuariosJson = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const users_Controllers = {

    login: (req,res)=> {
        res.render('users/login');
    },
    
    //MOSTRAR EL FORMULARIO DEL REGISTRO DE USUARIO
    registro: (req,res)=> {
        res.render('users/register', { errors: {}, data: {} });
    },

    formValidationRegister: (req, res, next) => {
        req.errors = validationResult(req);
        if (req.errors.isEmpty()) {
            next();
        } else {
            const errors = {};
            req.errors.errors.forEach(err => {
                if (!errors[err.param]) {
                    errors[err.param] = { msg: err.msg };
                }
            });
            res.render('users/register', { errors, data: req.body });
        } 
    },    

    //GUARDAR O AGREGAR UN NUEVO USUARIO A LA BD 
    storeRegistro: (req,res)=> { 
        let usuarioNew = (req.body);
        delete usuarioNew.confirmarPassword;
        if (req.file) {
            usuarioNew.img = req.file.filename;
        }
        usuarioNew.password = bcrypt.hashSync(req.body.password, 10);
        usuariosJson.push(usuarioNew)
        const usuarioNewJson = JSON.stringify(usuariosJson, null, 2);
        fs.writeFileSync('./data/usersData.json', usuarioNewJson);
        
        res.redirect('/login'); 
    }     
};

module.exports = users_Controllers;

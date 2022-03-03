const bcrypt = require('bcryptjs/dist/bcrypt');
const fs = require('fs');
const path = require('path');
const { validationResult  } = require('express-validator');
const res = require('express/lib/response');
const usuariosFilePath = path.join(__dirname, '../data/usersData.json');
const usuariosJson = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const users_Controllers = {

    login: (req,res)=> {
    //    let userToLogin = usuariosJson.findByField('email', req.body.email); 
       res.render('users/login'); 
    },

    formValidationLogin: (req, res, next) => {
        const resultErrors = validationResult(req);
        if (resultErrors.isEmpty()) {
            next();
        } else {
            const formateadoErrors = {};
            resultErrors.array().forEach(err => {
                if (formateadoErrors[err.param] === undefined) {
                    formateadoErrors[err.param] = { msg: err.msg };
                }
            })
        }

        console.log(resultErrors.array());
    },

    //MOSTRAR EL FORMULARIO DEL REGISTRO DE USUARIO
    registro: (req,res)=> {
        res.render('users/register', { errors: {}, data: {} });
    },

    formValidationRegister: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
        } else {
            const formateadoErrors = {};
            errors.array().forEach(err => {
                if (!formateadoErrors[err.param]) {
                    formateadoErrors[err.param] = { msg: err.msg };
                }
            });
            res.render('users/register', { errors: formateadoErrors, data: req.body });
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

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { validationResult  } = require('express-validator');
const usuariosFilePath = path.join(__dirname, '../data/usersData.json');
const usuariosJson = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const users_Controllers = {

    login: (req,res)=> {
       res.render('users/login', { resultErrors: {}, errorLogin: undefined }); 
    },
      
    loginProcess: (req, res) => { 
        const email = req.body.email;
        const password = req.body.password.trim();
        const recuerdame = req.body.recordarPassword;

        let userToLogin = usuariosJson.find(
            (usuario => usuario.email === email && bcrypt.compareSync(password, usuario.password))
        );

        if(userToLogin === undefined) {
            res.render('users/login', { resultErrors: {}, errorLogin: 'Los datos no coinciden' });
        }
        
        delete userToLogin.password; // eliminamos el atributo password para no tenerlo en la sesion
        req.session.userLogged = userToLogin;

        if(recuerdame !== 'undefined'){
            res.cookie('auth', JSON.stringify(userToLogin), {maxAge: 60 * 1000* 60})
        }
        res.redirect('/');
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
            }); 
            res.render('users/login', { resultErrors: formateadoErrors, errorLogin: undefined });
        }
    },

    //MOSTRAR EL FORMULARIO DEL REGISTRO DE USUARIO
    registro: (req,res)=> {
        res.render('users/register', { errors: {}, data: {}, errorEmail: undefined});
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
            res.render('users/register', { errors: formateadoErrors, data: req.body, errorEmail: undefined });
        } 
    },    

    //GUARDAR O AGREGAR UN NUEVO USUARIO A LA BD 
    storeRegistro: (req,res)=> { 
        let usuarioNew = req.body;
        delete usuarioNew.confirmarPassword;
        let userInDb = usuariosJson.find(usuario => {
            return usuario.email === usuarioNew.email;
        });
        if(userInDb) {
            res.render('users/register', { errorEmail: 'El Email ya existe', data: {}, errors: {} });
        } else {
            if (req.file) {
                usuarioNew.img = req.file.filename;
            }
            const salt = bcrypt.genSaltSync(10);
            usuarioNew.password = bcrypt.hashSync(req.body.password.trim(), salt);
            usuariosJson.push(usuarioNew)
            const usuarioNewJson = JSON.stringify(usuariosJson, null, 2);
            fs.writeFileSync('./data/usersData.json', usuarioNewJson);
            
            res.redirect('/login');
        }
    },
    logout: (req,res) => {
        console.log('adios');
        req.session.destroy();
        res.clearCookie("auth");
        res.redirect('/');
    }     
};

module.exports = users_Controllers;
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { validationResult  } = require('express-validator');
const res = require('express/lib/response');
const { use } = require('../routes/usersRoutes');
const usuariosFilePath = path.join(__dirname, '../data/usersData.json');
const usuariosJson = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const users_Controllers = {

    login: (req,res)=> {
       res.render('users/login', { resultErrors: {}, errorLogin: undefined }); 
    },
      
    loginProcess: (req, res) => { 
        const email = req.body.email;
        const password = req.body.password.trim();

        let userToLogin = usuariosJson.find(usuario => {
           return usuario.email === email;
        });

        if(userToLogin === undefined){
            res.render('users/login', { resultErrors: {}, errorLogin: 'Los datos no coinciden' });
        }

        const passwordCorrecto = bcrypt.compareSync(password, userToLogin.password);

        if (!passwordCorrecto){
            res.render('users/login', { resultErrors: {}, errorLogin: 'Los datos no coinciden' });
            return;
        }
        
        delete userToLogin.password; // para que no se mantenga el password en toda la aplicación; 
        // para simular el login por ahora redirecciono al home, Falta propagar los dato del usuario.
        req.session.userLogged = userToLogin;
        res.redirect('/');
        return;
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
            res.render('users/register', { errors: formateadoErrors, data: req.body });
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
    }     
};

module.exports = users_Controllers;
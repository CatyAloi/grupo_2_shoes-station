const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { validationResult  } = require('express-validator');
const res = require('express/lib/response');
const { use } = require('../routes/pruebaUsersRoutes');
const pruebaUsuariosFilePath = path.join(__dirname, '../data/pruebaUsersData.json');
const pruebaUsuariosJson = JSON.parse(fs.readFileSync(pruebaUsuariosFilePath, 'utf-8'));

const pruebaUsers_Controllers = {

    pruebaLogin: (req,res)=> {
       res.render('users/pruebaLogin', { resultErrors: {}, errorLogin: undefined }); 
    },
      
    pruebaLoginProcess: (req, res) => { 
        let errors=validationResult(req);
        if (errors.isEmpty()){
        const email = req.body.email;
        const password = req.body.password.trim();

        let pruebaUserToLogin = pruebaUsuariosJson.find(usuario => {
           return usuario.email === email;
        });

        if(pruebaUserToLogin === undefined){
            res.render('users/pruebaLogin', { resultErrors: {}, errorLogin: 'Los datos no coinciden' });
        }
        const passwordCorrecto = bcrypt.compareSync(password, pruebaUserToLogin.password);
        if (!passwordCorrecto){
            res.render('users/pruebaLogin', { resultErrors: {}, errorLogin: 'Los datos no coinciden' });
            return;
        }
        delete pruebaUserToLogin.password; // para que no se mantenga el password en toda la aplicación; 
        // para simular el login por ahora redirecciono al home, Falta propagar los dato del usuario.
        
        //equipara el usuario logueado al usuario a loguear
        req.session.userLogged = pruebaUserToLogin;

        //pregunto si el checkbox RECORDAME esta marcado
        if(req.body.recordarPassword !== undefined){
            res.cookie('recordame', 
            pruebaUserToLogin.email, { maxAge: 600000 }) 
        }
         
        res.redirect('/');
        return;
        } else {
            return res.render('/pruebaLogin', {errors: errors.errors});
        }
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
            res.render('users/pruebaLogin', { resultErrors: formateadoErrors, errorLogin: undefined });
        }
    },

    //MOSTRAR EL FORMULARIO DEL REGISTRO DE USUARIO
    registro: (req,res)=> {
        res.render('users/pruebaRegister', { errors: {}, data: {}, errorEmail: undefined});
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
            res.render('users/pruebaRegister', { errors: formateadoErrors, data: req.body, errorEmail: undefined });
        } 
    },    

    //GUARDAR O AGREGAR UN NUEVO USUARIO A LA BD 
    storeRegistro: (req,res)=> { 
        let pruebaUsuarioNew = req.body;
        delete pruebaUsuarioNew.confirmarPassword;
        let userInDb = pruebaUsuariosJson.find(usuario => {
            return usuario.email === pruebaUsuarioNew.email;
        });
        if(userInDb) {
            res.render('users/pruebaRegister', { errorEmail: 'El Email ya existe', data: {}, errors: {} });
        } else {
            if (req.file) {
                pruebaUsuarioNew.img = req.file.filename;
            }
            const salt = bcrypt.genSaltSync(10);
            pruebaUsuarioNew.password = bcrypt.hashSync(req.body.password.trim(), salt);
            pruebaUsuariosJson.push(pruebaUsuarioNew)
            const pruebaUsuarioNewJson = JSON.stringify(pruebaUsuariosJson, null, 2);
            fs.writeFileSync('./data/pruebaUsersData.json', pruebaUsuarioNewJson);
            
            res.redirect('/pruebaLogin');
        }
    }     
};

module.exports = pruebaUsers_Controllers;
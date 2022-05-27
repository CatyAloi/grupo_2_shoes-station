const bcrypt = require('bcryptjs');
const { validationResult  } = require('express-validator');
const db = require('../database/models');

const users_Controllers = {

    login: (req,res)=> {
        res.render('users/login', { resultErrors: {}, errorLogin: undefined }); 
    },

    loginProcess: async (req, res) => { 
        const { email, pwd } = req.body;
        
        const userToLogin = await db.usuarios.findOne({ where: { email: email } })

        if (userToLogin === null) {
            res.render('users/login', { resultErrors: {}, errorLogin: 'Los datos no coinciden, verifique sus datos de acceso' });
            return;
        } 
        
        const passwordsAreEquals = bcrypt.compareSync(pwd, userToLogin.pwd);

        if (!passwordsAreEquals) {
            res.render('users/login', { resultErrors: {}, errorLogin: 'Los datos no coinciden, verifique sus datos de acceso' });
            return;
        }
        
        req.session.userLogged = { 
            id: userToLogin.id,
            nombre: userToLogin.nombre,
            telefono: userToLogin.telefono,
            email: userToLogin.email,
            admin: userToLogin.admin,
        };

        if(req.body.recuerdame && req.body.recuerdame === 'recuerdame'){
            const cookie = { recuerdame: { email: userToLogin.email } };
            res.cookie('auth', JSON.stringify(cookie), { maxAge: 200000000 })
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
        res.render('users/register', { errors: {}, data: {}, errorEmail: undefined, usuario: req.session.userLogged});
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
    storeRegistro: async (req,res)=> { 
        const usuarioNew = req.body;

        delete usuarioNew.confirmarPassword;

        const userInDb = await db.usuarios.findOne({ where: { email: usuarioNew.email } });

        console.log(userInDb);

        if(userInDb) {
            res.render('users/register', { errorEmail: 'El Email ya existe', data: {}, errors: {} });
        } else {
            if (req.file) {
                usuarioNew.img = req.file.filename;
            }
            const salt = bcrypt.genSaltSync(10);
            usuarioNew.pwd = bcrypt.hashSync(req.body.pwd.trim(), salt);
            
            if(usuarioNew.admin === 'on'){
                usuarioNew.admin = true;
            } else {
                usuarioNew.admin = false;
            }

            if(usuarioNew.politicas === 'on'){
                usuarioNew.politicas = true;
            } else {
                usuarioNew.politicas = false;
            }

            try {
                await db.usuarios.create(usuarioNew);
            } catch (e) {
                console.log('ERROR:', e)
            }

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
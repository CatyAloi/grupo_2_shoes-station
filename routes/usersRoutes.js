const express = require('express');
const path = require('path');
const multer = require('multer');
const { body, check } = require ('express-validator');
const router = express.Router();

const storage = multer.diskStorage({
    // Carpeta destino del archivo
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/images/users'));
    },
    filename: function (req, file, cb) {
        // Nombre del archivo
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

//Crear una instancia de multer con esa lógica
// clase( parametros )
const upload = multer({ storage });

let usersControllers = require('../controllers/usersControllers');

router.get('/login', usersControllers.login);

router.post('/login',
    check('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('El email no es valido'), 
    check('password').notEmpty().withMessage('La contraseña es requerida'),
    usersControllers.formValidationLogin,
    usersControllers.loginProcess
);

//CREAR O REGISTRAR UN USUARIO//
router.get('/registro', usersControllers.registro);

router.post(
    '/registro',
    upload.single('img'),
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('apellido', 'El apellido es requerido').notEmpty(),
    check('telefono').notEmpty().withMessage('El teléfono es requerido').isNumeric().withMessage('Solo se aceptan números'),
    check('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('El email no es valido'),
    check('password').notEmpty().withMessage('La contraseña es requerida'),
    check('confirmarPassword')
        .notEmpty().withMessage('La contraseña es requerida')
        .custom((value, {req}) => (value === req.body.password)).withMessage('Las contraseñas no coinciden'),
    usersControllers.formValidationRegister,
    usersControllers.storeRegistro
);

module.exports = router;

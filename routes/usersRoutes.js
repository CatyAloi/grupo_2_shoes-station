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
    check('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('El email no es valido'),

    check('pwd').notEmpty().withMessage('La contraseña es requerida'),
    usersControllers.formValidationLogin,
    usersControllers.loginProcess
);

//CREAR O REGISTRAR UN USUARIO//
router.get('/registro', usersControllers.registro);

router.post(
    '/registro',
    upload.single('img'),
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('nombre', 'El nombre debe tener mínimo 2 caracteres').isLength({min: 2}),
    check('apellido', 'El apellido es requerido').notEmpty(),
    check('apellido', 'El apellido debe tener mínimo 2 caracteres').isLength({min: 2}),
    check('telefono').notEmpty().withMessage('El teléfono es requerido').isNumeric().withMessage('Solo se aceptan números'),
    check('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('El email no es valido'),
    check('pwd').notEmpty().withMessage('La contraseña es requerida'),
    check('pwd', 'La contraseña debería tener un mínimo de 8 caracteres').isLength({min: 8}),
    check('confirmarPassword', 'La contraseña debería tener un mínimo de 8 caracteres').isLength({min: 8}),
    check('confirmarPassword')
        .notEmpty().withMessage('La contraseña es requerida')
        .custom((value, {req}) => (value === req.body.pwd)).withMessage('Las contraseñas no coinciden'),    
    check('politicas').custom(value => value == 'on').withMessage('Debe aceptar las Políticas, Términos y Condiciones'),
    usersControllers.formValidationRegister,
    usersControllers.storeRegistro
);

router.get('/logout', usersControllers.logout);

module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {check} =  require('express-validator');

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

const ValidationRegister = [
    check('nombre', 'El nombre es requerido').notEmpty().isLength({min: 2}).withMessage('El Nombre debe tener mínimo 2 caracteres'),
    check('apellido', 'El apellido es requerido').notEmpty().isLength({min: 2}).withMessage('El Apellido debe tener mínimo 2 caracteres'),
    check('telefono').notEmpty().withMessage('El teléfono es requerido').isNumeric().withMessage('Solo se aceptan números'),
    check('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('El email no es válido'),
    check('pwd').notEmpty().withMessage('La contraseña es requerida').isLength({min: 8}).withMessage('La contraseña debe tener mínimo 8 caracteres'),
    check('confirmarPassword').notEmpty().withMessage('La confirmación de la contraseña es requerida').custom((value, {req}) => (value === req.body.pwd)).withMessage('Las contraseñas no coinciden'),
    check('politicas').custom(value => value == 'on').withMessage('Para continuar deberás aceptar las Políticas de Privacidad, Términos y Condiciones'),
   
]

let usersControllers = require('../controllers/usersControllers');



router.get('/login', usersControllers.login);

router.post('/login',
    check('email')
        .notEmpty().withMessage('El email es requerido').isEmail()
        .withMessage('El email no es valido'),

    check('pwd')
        .notEmpty().withMessage('La contraseña es requerida'),
    usersControllers.formValidationLogin,
    usersControllers.loginProcess
);

//CREAR O REGISTRAR UN USUARIO//
router.get('/registro', usersControllers.registro);

router.post(
    '/registro', upload.single('img'), ValidationRegister, usersControllers.formValidationRegister, usersControllers.storeRegistro);

router.get('/logout', usersControllers.logout);

//LISTAR USUARIOS REGISTRADOS//
router.get('/usuariosregistrados', usersControllers.listarUsuariosRegistrados);

module.exports = router;
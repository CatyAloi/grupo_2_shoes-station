const express = require('express');
const path = require('path');
const multer = require('multer');
const { body, check } = require ('express-validator');
const router = express.Router();
let guestMiddleware = require('../middlewares/guestMiddleware');

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

let pruebaUsersControllers = require('../controllers/pruebaUsersControllers');
let usersControllers = require('../controllers/usersControllers');

router.get('/login', usersControllers.login);
router.get('/pruebaLogin', pruebaUsersControllers.pruebaLogin);

router.post('/pruebaLogin',
    check('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('El email no es valido'), 
    check('password').notEmpty().withMessage('La contraseña es requerida'),
    pruebaUsersControllers.formValidationLogin,
    pruebaUsersControllers.pruebaLoginProcess
);
router.get('/users/check', function (req,res){
    if (req.session.userLogged==undefined){
        res.send('No estás logueado');
    } else {
        res.send('El usuario logueado es ' + req.session.userLogged.email);
    }
})
//CREAR O REGISTRAR UN USUARIO//
router.get('/registro', usersControllers.registro);
router.get('/pruebaRegistro', guestMiddleware, pruebaUsersControllers.registro);

router.post(
    '/pruebaRegistro',
    upload.single('img'),
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('apellido', 'El apellido es requerido').notEmpty(),
    check('telefono').notEmpty().withMessage('El teléfono es requerido').isNumeric().withMessage('Solo se aceptan números'),
    check('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('El email no es valido'),
    check('password').notEmpty().withMessage('La contraseña es requerida'),
    check('confirmarPassword')
        .notEmpty().withMessage('La contraseña es requerida')
        .custom((value, {req}) => (value === req.body.password)).withMessage('Las contraseñas no coinciden'),
    pruebaUsersControllers.formValidationRegister,
    pruebaUsersControllers.storeRegistro
);

module.exports = router;

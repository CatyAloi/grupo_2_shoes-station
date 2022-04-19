const express = require('express');
const router = express.Router();
const controlador = require('../controllers/mainControllers');
const {check} =  require('express-validator');

const validationContact = [
    check('Nombre').notEmpty().withMessage('Debe ingresar su Nombre y Apellido').bail(),
    check('Nombre').isLength({min: 2}).withMessage('Este campo debe tener mínimo 2 caracteres'),
    check('Email').notEmpty().withMessage('Debe ingresar un Email').bail(),
    check('Email').isEmail().withMessage('Debe ingresar un email con formato válido'),
    check('Telefono').notEmpty().withMessage('Debe ingresar un número de Teléfono').bail(),
    check('Telefono').isLength({min: 11}).withMessage('Por Favor, ingrese un número de teléfono válido'),
    check('mensaje').notEmpty().withMessage('Por favor, escriba su mensaje').bail(),
    check('mensaje').isLength({min: 10}).withMessage('Este campo debe tener mínimo 10 caracteres'),
]


router.get('/', controlador.home);
router.get('/contacto', controlador.contacto);
router.post('/contacto', validationContact, controlador.processContact);

router.get('/terminos-y-condiciones', controlador.terminos);
router.get('/politicas-de-privacidad', controlador.privacidad);
router.get('/nosotros', controlador.nosotros);
router.get('/metodos-pago', controlador.metodos_pago);
router.get('/pruebaSession', function(req,res){
    if(req.session.numeroVisitas==undefined){
        req.session.numeroVisitas=0;
    }
    req.session.numeroVisitas++;
    res.send('Session tiene numero: ' + req.session.numeroVisitas)
})


module.exports = router;
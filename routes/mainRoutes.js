const express = require('express');
const router = express.Router();
const controlador = require('../controllers/mainControllers');

router.get('/', controlador.home);
router.get('/contacto', controlador.contacto);
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
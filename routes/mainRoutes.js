const express = require('express');
const router = express.Router();
const controlador = require('../controllers/mainControllers');

router.get('/', controlador.home);
router.get('/pruebaHome', controlador.pruebaHome);
router.get('/contacto', controlador.contacto);
router.get('/pruebaSession', function(req,res){
    if(req.session.numeroVisitas==undefined){
        req.session.numeroVisitas=0;
    }
    req.session.numeroVisitas++;
    res.send('Session tiene numero: ' + req.session.numeroVisitas)
})

module.exports = router;
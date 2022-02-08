
const express = require('express');

const path = require('path');

let controlador = require('../controllers/mainControllers');
const router = express.Router();


router.get('/', controlador.home);

router.get('/contacto', controlador.contacto);



module.exports = router;
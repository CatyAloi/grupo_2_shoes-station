const express = require('express');
const router = express.Router();
const controlador = require('../controllers/mainControllers');

router.get('/', controlador.home);
router.get('/contacto', controlador.contacto);

module.exports = router;
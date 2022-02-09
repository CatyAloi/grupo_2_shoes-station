const express = require('express');
const path = require('path');
const router = express.Router();

const controladorProduct = require('../controllers/productControllers');

router.get('/catalogo', controladorProduct.catalogo);
router.get('/detalle/:id', controladorProduct.detalle);
router.get('/carrito', controladorProduct.carrito);
router.get('/crearproductos', controladorProduct.crearProducto);
router.get('/editarproductos', controladorProduct.editarProducto);

module.exports = router;
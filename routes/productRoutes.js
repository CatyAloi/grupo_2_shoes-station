

const express = require('express');

const path = require('path');

let controladorProduct = require('../controllers/productControllers');
const router = express.Router();


router.get('/catalogo', controladorProduct.catalogo);

router.get('/detalle', controladorProduct.detalle);

/*router.get('/:id', controladorProduct.mostrarPorId);*/

router.get('/carrito', controladorProduct.carrito);

router.get('/crearproductos', controladorProduct.crearProducto);

router.get('/editarproductos', controladorProduct.editarProducto);

module.exports = router;
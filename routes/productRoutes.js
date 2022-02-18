const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    // Carpeta destino del archivo
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/images'));
    },
    filename: function (req, file, cb) {
        // Nombre del archivo
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

//Crear una instancia de multer con esa lógica
// clase( parametros )
const upload = multer({ storage });


const controladorProduct = require('../controllers/productControllers');

//SHOW ALL PRODUCTS//
router.get('/catalogo', controladorProduct.catalogo);

//CART//
router.get('/carrito', controladorProduct.carrito);

//GET ONE PRODUCT//
router.get('/detalle/:id', controladorProduct.detalle);

//CREATE ONE PRODUCT//
router.get('/crearproductos', controladorProduct.crearProducto);
router.post('/crearproductos', upload.single('img'), controladorProduct.store);

//EDIT ONE PRODUCT//
router.get('/editarproductos/:id', controladorProduct.editarProducto);

//DELETE ONE PRODUCT//


module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const {check} =  require('express-validator');

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

const validationCreated = [
    check('nombre').notEmpty().withMessage('Debe ingresar el nombre del producto').bail(),
    check('nombre').isLength({min: 10}).withMessage('El nombre debe tener mínimo 10 caracteres'),
    check('precio').notEmpty().withMessage('Debe ingresar el precio del producto'),
    check('descripcion').notEmpty().withMessage('Debe ingresar la descripción del producto'),
    check('stock').notEmpty().withMessage('Debe ingresar la cantidad de Zapatillas disponibles'),
   
]

const validationEdit = [
    check('nombre').notEmpty().withMessage('Este campo no puede quedar vacío, debe ingresar el nombre del producto').bail(),
    check('nombre').isLength({min: 10}).withMessage('El nombre debe tener mínimo 10 caracteres'),
    check('precio').notEmpty().withMessage('Este campo no puede quedar vacío, debe ingresar el precio del producto'),
    check('descripcion').notEmpty().withMessage('Este campo no puede quedar vacío, debe ingresar la descripción del producto'),
    check('stock').notEmpty().withMessage('Este campo no puede quedar vacío, debe ingresar la cantidad de Zapatillas disponibles'),
   
]


const controladorProduct = require('../controllers/productControllers');

//SHOW ALL PRODUCTS//
router.get('/catalogo', controladorProduct.catalogo);

//CART//
router.get('/carrito', controladorProduct.carrito);

//GET ONE PRODUCT//
router.get('/detalle/:id', controladorProduct.detalle);

//CREATE ONE PRODUCT//
router.get('/crearproductos', controladorProduct.crearProducto);
router.post('/crearproductos', upload.single('img'), validationCreated, controladorProduct.store);

//EDIT ONE PRODUCT//
router.get('/editarproductos/:id', controladorProduct.editarProducto);
router.post('/editarproductos/:id', upload.single('img'), validationEdit, controladorProduct.store)

//DELETE ONE PRODUCT//
router.delete('/borrarProducto/:id', controladorProduct.borrarProducto);

module.exports = router;
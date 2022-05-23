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
    check('precio').notEmpty().withMessage('Debe ingresar el precio del producto o el precio de oferta'),
    check('descripcion').notEmpty().withMessage('Debe ingresar la descripción del producto').bail(),
    check('descripcion').isLength({min: 50}).withMessage('La Descripción del producto debe tener mínimo 50 caracteres'),
    check('talles').notEmpty().withMessage('Debe seleccionar al menos un talle disponible para esta zapatilla'),
    check('stock').notEmpty().withMessage('Debe ingresar la cantidad de Zapatillas disponibles'),
    check('img').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file){
            throw new Error ('Debes subir una imagen');
       } else{
           let fileExtension=path.extname(file.originalname);
           if (!acceptedExtensions.includes(fileExtension)){
            throw new Error (`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
           }
       }
       return true;
    }) 
]

const validationEdit = [
  check('nombre').notEmpty().withMessage('Este campo no puede quedar vacío, debe ingresar el nombre del producto'),
  check('precio').notEmpty().withMessage('Este campo no puede quedar vacío, debe ingresar el precio del producto o un precio de oferta'),
  check('descripcion').notEmpty().withMessage('Este campo no puede quedar vacío, debe ingresar la descripción del producto'),
  check('talles').notEmpty().withMessage('Debe seleccionar al menos un talle disponible para esta zapatilla'),
  check('stock').notEmpty().withMessage('Este campo no puede quedar vacío, debe ingresar la cantidad de Zapatillas disponibles'),
   
]


//const controladorProduct = require('../controllers/productControllers');

const productControllers = require('../controllers/productControllers');

//SHOW ALL PRODUCTS//
router.get('/catalogo', productControllers.catalogo);

//CART//
router.get('/carrito', productControllers.carrito);
router.post('/carrito', productControllers.carrito_producto);

//GET ONE PRODUCT//
router.get('/detalle/:id', productControllers.detalle);

//CREATE ONE PRODUCT//
router.get('/crearproductos', productControllers.crearProducto);
router.post('/crearproductos', upload.single('img'), validationCreated, productControllers.processadd, productControllers.store);

//EDIT ONE PRODUCT//
router.get('/editarproductos/:id', productControllers.editarProducto);
router.post('/editarproductos/:id', upload.single('img'), validationEdit, productControllers.processedit, productControllers.store)

//DELETE ONE PRODUCT//
router.delete('/borrarProducto/:id', productControllers.borrarProducto);

module.exports = router;
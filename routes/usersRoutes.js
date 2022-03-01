const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    // Carpeta destino del archivo
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/images/users'));
    },
    filename: function (req, file, cb) {
        // Nombre del archivo
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

//Crear una instancia de multer con esa lógica
// clase( parametros )
const upload = multer({ storage });

let usersControllers = require('../controllers/usersControllers');

router.get('/login', usersControllers.login);


//CREAR O REGISTRAR UN USUARIO//
router.get('/registro', usersControllers.registro);

router.post('/registro', upload.single('img'), usersControllers.updateRegistro);

module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();

let control = require('../controllers/usersControllers');

router.get('/login', control.login);

router.get('/registro', control.registro);

module.exports = router;

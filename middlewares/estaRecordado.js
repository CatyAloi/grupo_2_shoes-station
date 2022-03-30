const fs = require('fs');
const path = require('path');
const { validationResult  } = require('express-validator');
const usuariosFilePath = path.join(__dirname, '../data/usersData.json');
const usuariosJson = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


const estaRecordado = (req, res, next) => {
    if(req.cookies.auth){
        const emailUsuario= req.cookies.auth;
        const usuarioLogeado = usuariosJson.find(usuario => usuario.email === emailUsuario);
        delete usuarioLogeado.password;
        req.session.userLogged = usuarioLogeado;
    }
    next();
}

module.exports = estaRecordado;
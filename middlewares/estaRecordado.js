const estaRecordado = (req, res, next) => {
    if(req.cookies.auth){
        const usuarioLogeado = JSON.parse(req.cookies.auth)
        req.session.userLogged = usuarioLogeado;
    }
    next();
}

module.exports = estaRecordado;
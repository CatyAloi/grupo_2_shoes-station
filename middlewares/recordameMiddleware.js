function recordameMiddleware (req, res, next) {
    next();
    if(req.cookies.recordame != undefined && 
        req.session.userLogged == undefined){
            const email = req.body.email;
            let pruebaUserToLogin = pruebaUsuariosJson.find(usuario => {
                return usuario.email === email;
            });
            req.session.userLogged = pruebaUserToLogin;
    };
};

module.exports= recordameMiddleware;
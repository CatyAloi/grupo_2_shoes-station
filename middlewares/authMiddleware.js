function authMiddleware(req, res, next){
    const rutasAdmin = [
        '/editarproductos',
        '/crearproductos',
    ]

    if (
        ((req.session.userLogged && !req.session.userLogged.admin && rutasAdmin.find(url => req.url.indexOf(url) > -1)) ||
        (!req.session.userLogged && rutasAdmin.find(url => req.url.indexOf(url) > -1)))
    ) {
        res.redirect('/404');
    } else {
        next();
    }
};
    
module.exports = authMiddleware;
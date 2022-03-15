function guestMiddleware(req, res, next){
    if(req.session.userLogged==undefined){
        next();
    } else {
        res.send('Esta página es sólo para invitados');
    }
    };
    
    module.exports = guestMiddleware;
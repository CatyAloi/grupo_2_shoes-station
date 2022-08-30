const db = require('./../database/models/index'); 

const estaRecordado = async (req, res, next) => {
  if(req.cookies.auth){
    const cookieAuth = JSON.parse(req.cookies.auth)
    const userToLogin = await db.usuarios.findOne({ where: { email: cookieAuth.recuerdame.email } })
    req.session.userLogged = { 
      id: userToLogin.id,
      nombre: userToLogin.nombre,
      telefono: userToLogin.telefono,
      email: userToLogin.email,
      admin: userToLogin.admin,
    };
  }
  next();
}

module.exports = estaRecordado;
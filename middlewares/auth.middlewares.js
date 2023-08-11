function isLoggedIn(req, res, next) {
    if (req.session.user === undefined) {
      //usuario no está logeado
      res.redirect("/auth/login")
    } else {
      //usuario si está activo
      next()
    }
  }
  
function isAdmin(req, res, next) {
    if (req.session.user.role === "admin") {
      next() // continua
    } else {
      res.redirect("/auth/login")
    }
  }

function updateLocals(req, res, next) {

  if (req.session.user === undefined) {
    //nueva variable local que muestre que no está logeado
    res.locals.isUserActive = false;
  } else {
    //nueva variable local que muestre que si está logeado
    res.locals.isUserActive = true;
  }

  next() //continua con las rutas despues de actualizar la variable
}
  
  
module.exports = {
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    updateLocals:updateLocals
  }
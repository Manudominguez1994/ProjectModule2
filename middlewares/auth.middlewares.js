//funcion que comprueba si esta log in
function isLoggedIn(req, res, next) {
  if (req.session.user === undefined) {
    //usuario no está logeado
    res.redirect("/auth/login");
  } else {
    //usuario si está activo
    next();
  }
}

//funcion que comprueba si el rol del user es admin
function isAdmin(req, res, next) {
  if (req.session.user.role === "admin") {
    next(); // continua
  } else {
    res.redirect("/auth/login");
  }
}

function updateLocals(req, res, next) {
  if (req.session.user === undefined) {
    //variable que indica que el user no esta logeado
    res.locals.isUserActive = false;
  } else {
    //variable que indica que el user si esta logeado
    res.locals.isUserActive = true;
    if (req.session.user.role === "admin"){
      res.locals.isAdminActive = true;
    } else {
      res.locals.isAdminActive = false;
    }
  }
  next();
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isAdmin: isAdmin,
  updateLocals: updateLocals,
};

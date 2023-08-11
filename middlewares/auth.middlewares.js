function isLoggedIn(req, res, next) {
  if (req.session.user === undefined) {
    //usuario no está logeado
    res.redirect("/auth/login");
  } else {
    //usuario si está activo
    next();
  }
}

function isAdmin(req, res, next) {
  if (req.session.user.role === "admin") {
    next(); // continua
  } else {
    res.redirect("/auth/login");
  }
}

function updateLocals(req, res, next) {
  if (req.session.user === undefined) {
    res.locals.isUserActive = false;
  } else {
    res.locals.isUserActive = true;
  }

  next();
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isAdmin: isAdmin,
  updateLocals: updateLocals
};

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

// GET "/auth/signup"=> renderiza al usuario la vista con el formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});
// POST "/auth/signup"=> recibir la info del form del usuario y crearlo en la BD
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { username, email, password, dateborn } = req.body;
  //condicional para comprobar que todos los campos del form registro estan rellenos
  if (username === "" || email === "" || password === "" || dateborn === "") {
    res.status(400).render("auth/signup.hbs", {
      errorMessage: "Debes rellenar todos los campos para registrarte",
    });
    return;
  }
  //validar que la contraseña tenga los caracteres pedidos: mayusc, minusc, caracter especial y leng: +=8
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).render("auth/signup.hbs", {
      errorMessage:
        "La contraseña debe contener mínimo una mayuscula, una minuscula, un caracter especial y tener 8 caracteres o más",
    });
    return;
  }
  try {
    //comprobamos si el usuario existe a traves del nombre / email
    const userFound = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    console.log(userFound);
    if (userFound !== null) {
      res.status(400).render("auth/signup.hbs", {
        errorMessage:
          "Ya existe un usuario con el mismo nombre de usuario o correo electronico",
      });
      return;
    }
    //ciframos password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);
    await User.create({
      username: username,
      email: email,
      password: passwordHash,
    });
    // lo ultimo que ocurrira cuando se ejecute todo...
    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});
//GET /auth/login => Renderiza la vista del login
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});
//POST /auth/login => Recibe las credenciales del usuario y valida/autentica
router.post("/login", async (req, res, next) => {
  try {
    //Verificacion de que el usuario esta creado
    //Verificacion Email
    const userFound = await User.findOne({ email: email });
    console.log(userFound);
    if (userFound === undefined) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "No existe niguna cuenta con ese correo",
      });
      return;
    }
    //Verificacion Password
    const passwordCorrect = await bcrypt.compare(password, userFound.password);
    console.log(passwordCorrect);
    if (passwordCorrect === false) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "Contraseña no valida",
      });
      return;
    }
    //Creamos una sesion activa del usuario
    req.session.user = {
      _id: userFound._id,
      email: userFound.email,
      role: userFound.role,
    };
    //Invocamos el metodo save => el cual espera a que la sesion se inicie para realizar una accion en nuestro caso res.redirect
    req.session.save(() => {
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;

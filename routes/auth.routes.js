const express = require("express");
const router = express.Router();
const uploadImg = require("../middlewares/cloudinary.middlewares");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

// GET "/auth/signup"=> renderiza al usuario la vista con el formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});
// POST "/auth/signup"=> recibir la info del form del usuario y crearlo en la BD
router.post(
  "/signup",
  uploadImg.single("profileImg"),
  async (req, res, next) => {
    console.log("body", req.body);
    const { username, email, password, dateborn, confirmPassword } = req.body;
    let profileImg;
    //condicional que comprueba si las contraseñas introducidas coinciden
    if (password !== confirmPassword) {
      res.status(400).render("auth/signup.hbs", {
        errorMessage: "Las contraseñas no coinciden",
      });
      return;
    }
    //condicional que comprueba si el usuario ha introducido una imagen y sino le asigna una default
    if (req.file) {
      profileImg = req.file.path;
    } else {
      profileImg =
        "https://res.cloudinary.com/dwvmn4fii/image/upload/v1692024366/default-profile.jpg";
    }

    //condicional para comprobar que todos los campos del form registro estan rellenos
    if (username === "" || email === "" || password === ""|| confirmPassword === ""|| dateborn === "") {
      res.status(400).render("auth/signup.hbs", {
        errorMessage: "Debes rellenar todos los campos para registrarte",
      });
      return;
    }
    //validar que el email tenga el formato pedido: usuario@dominio
    const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (regexEmail.test(email) === false) {
      res.status(400).render("auth/signup.hbs", {
        errorMessage: "El email introducido no es válido, prueba de nuevo",
      });
      return;
    }
    //validar que la contraseña tenga los caracteres pedidos: mayusc, minusc, caracter especial y leng: +=8
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (regexPassword.test(password, confirmPassword) === false) {
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
      // console.log(userFound);
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
      const passwordHash2 = await bcrypt.hash(confirmPassword, salt);
      // console.log(passwordHash);
       // console.log(passwordHash2);
      console.log("el valor de nuestra img", profileImg);
      await User.create({
        username: username,
        email: email,
        password: passwordHash,
        confirmPassword:passwordHash2,
        dateborn: dateborn,
        profileImg: profileImg,
      });
      res.redirect("/auth/login");
    } catch (error) {
      next(error);
    }
  }
);
//GET /auth/login => Renderiza la vista del login
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});
//POST /auth/login => Recibe las credenciales del usuario y valida/autentica
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //Verificacion de que el usuario esta creado
    //Verificacion Email
    const userFound = await User.findOne({ email: email });
    // console.log("el usuario",userFound);
    if (userFound === null) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "No existe niguna cuenta con ese correo",
      });
      return;
    }
    //Verificacion Password
    const passwordCorrect = await bcrypt.compare(password, userFound.password);
    // console.log(passwordCorrect);
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
// GET "/auth/logout" => el usuario puede cerrar su sesion activa
router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = router;

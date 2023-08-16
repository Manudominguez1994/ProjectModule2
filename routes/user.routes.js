const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model");
const User = require("../models/User.model");
// const { findById } = require("../models/Place.model");
const uploadImg = require("../middlewares/cloudinary.middlewares");
const { isLoggedIn } = require("../middlewares/auth.middlewares");

//GET /user/:userId => Renderizamos la vista del perfil de usuario
router.get("/profile", isLoggedIn, async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.session.user._id).populate(
      "placeFav"
    );

    const dateborn = oneUser.dateborn.toDateString();
    console.log("esta es la fecha to String", dateborn);
    console.log("propiedades del user", oneUser);
    res.render("users/profile-user.hbs", { oneUser, dateborn });
  } catch (error) {
    next(error);
  }
});
//POST /user/:placeId/fav => Añadimos a la propiedad de sitios favoritos de la base de datos los lugares
router.post("/:placeId/fav", isLoggedIn, async (req, res, next) => {
  try {
    const onePlace = await Place.findById(req.params.placeId);
    const addPlaceFav = await User.findByIdAndUpdate(req.session.user._id, {
      $addToSet: { placeFav: req.params.placeId },
    });
    // console.log(addPlaceFav);
    res.redirect(`/places/${onePlace.province}`);
  } catch (error) {
    next(error);
  }
});
//POST /user/:placeId/fav => Eliminamos el lugar de sitios favoritos de la base de datos los lugares
router.post("/:placeId/delete", isLoggedIn, async (req, res, next) => {
  try {
    //const onePlace = await Place.findById(req.params.placeId)
    const deletePlaceFav = await User.findByIdAndUpdate(req.session.user._id, {
      $pull: { placeFav: req.params.placeId },
    });
    console.log("eliminado lugar fav", deletePlaceFav);
    res.redirect("/user/profile");
  } catch (error) {
    next(error);
  }
});
//GET /user/list-users => listamos todo los usuarios de nuestra web
router.get("/list-users", async (req, res, next) => {
  try {
    const allUsers = await User.find({ role: "user" });
    res.render("users/list-user.hbs", { allUsers });
  } catch (error) {
    next(error);
  }
});
//POST /user/delete/:userId => Ruta para borrar un usuario
router.post("/delete/:userId", async (req, res, next) => {
  try {
    const oneUser = await User.findByIdAndDelete(req.params.userId);
    console.log("user que borraremos", oneUser);
    res.redirect(`/user/list-users`);
  } catch (error) {
    next(error);
  }
});
//GET /user/update/=> renderizamos la vista de editar usuario
router.get("/update", async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.session.user._id);
    res.render("users/edit-user.hbs", { oneUser });
  } catch (error) {
    next(error);
  }
});
//POST /user/update/ => actualizamos la informacion de la DB del usuario
router.post(
  "/update",
  uploadImg.single("profileImg"),
  async (req, res, next) => {
    const { username, email, dateborn } = req.body;
    try {
      let datebornToUpdate = req.session.user.dateborn;
      let profileImgUpdate = req.session.user.profileImg;
      //condicional que si no introduces fecha nueva no actualiza y deja la anterior
      if (dateborn) {
        datebornToUpdate = dateborn;
      }
      //condicional que si no introduces foto nueva no actualiza y deja la anterior
      if (req.file) {
        profileImgUpdate = req.file.path;
      }
      //await User.findByIdAndUpdate(req.session.user._id, {profileImg: req.file.path})
      const userUpdate = await User.findByIdAndUpdate(req.session.user._id, {
        username,
        email,
        dateborn: datebornToUpdate,
        profileImg: profileImgUpdate,
      });
      console.log("usuario actualizado", userUpdate);
      res.redirect("/user/profile");
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;

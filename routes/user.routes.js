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
    const oneUser = await User.findById(req.session.user._id).populate("placeFav");

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
//POST /user/upload-profile-img => Actualizamos la imagen de perfil del usuario
router.post("/upload-profile-img", uploadImg.single("profileImg"), async  (req, res, next) => {

  //console.log(req.file)
try { // buscamos el usuario que está subiendo esa imagen y cambiamos su profileImg por el req.file.path de cloudinary
  await User.findByIdAndUpdate(req.session.user._id, {profileImg: req.file.path})
  res.redirect("/user/profile")
} 
catch (error) {
  next(error);
 }
})
//GET /user/list-users => listamos todo los usuarios de nuestra web
router.get("/list-users",async(req, res, next)=>{
  try {
    const allUsers = await User.find({role:"user"})
    res.render("users/list-user.hbs",{allUsers})
  } catch (error) {
    next(error)
  }
})
//POST /user/delete => Ruta para borrar un usuario
router.post("/delete/:userId", async(req, res, next)=>{
  try {
    const oneUser = await User.findByIdAndDelete(req.params.userId)
    console.log("user que borraremos", oneUser);
    res.redirect(`/user/list-users`)
  } catch (error) {
    next(error)
  }
})

module.exports = router;

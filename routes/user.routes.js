const express = require("express");
const router = express.Router();

const Place = require("../models/Place.model");
const User = require("../models/User.model");
const { findById } = require("../models/Place.model");

const {isLoggedIn} = require("../middlewares/auth.middlewares")

//GET /user/:userId => Renderizamos la vista del perfil de usuario
router.get("/profile",isLoggedIn ,async(req, res, next)=>{
     try {
        const oneUser = await User.findById(req.session.user._id).populate("placeFav")
        console.log(oneUser);
        res.render("users/profile-user.hbs",{oneUser})
     } catch (error) {
         next(error)
     }
})
//POST /user/:placeId/fav => Añadimos a la propiedad de sitios favoritos de la base de datos los lugares
router.post("/:placeId/fav",isLoggedIn, async(req, res, next)=>{
try {
    const onePlace = await Place.findById(req.params.placeId)
    const addPlaceFav = await User.findByIdAndUpdate(req.session.user._id,{$addToSet:{placeFav: req.params.placeId}})
    // console.log(addPlaceFav);
    res.redirect(`/places/${onePlace.province}`)
} catch (error) {
    next(error)
}
})
module.exports = router;

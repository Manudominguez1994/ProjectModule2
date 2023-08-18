const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model");
const Comment = require("../models/Comments.model");
// const User = require("../models/User.model");
const {
  isLoggedIn,
  isAdmin,
  updateLocals,
} = require("../middlewares/auth.middlewares");
const word = "patata";

//POST /comment/create => Creamos un comentario en nuestra seccion de detalles de los lugares
router.post("/create/:placeId", async (req, res, next) => {
  try {
    let stars = "";
    if (req.body.valoration === "1") {
      stars = "⭐";
    } else if (req.body.valoration === "2") {
      stars = "⭐⭐";
    } else if (req.body.valoration === "3") {
      stars = "⭐⭐⭐";
    } else if (req.body.valoration === "4") {
      stars = "⭐⭐⭐⭐";
    } else if (req.body.valoration === "5") {
      stars = "⭐⭐⭐⭐⭐";
      //console.log("comentarios estrellitas", stars);
    }
    //Condicional para comprobar si no se escribe nada en el comentario
    if (req.body.description === "" || stars === "") {
      res.status(400).render("places/place-details.hbs", {
        errorMessage:
          "Debes rellenar todos los campos para publicar tu comentario",
      });
      //console.log("esta es mi descriipcion", req.body.description);
      return;
    }
    const currentDate = new Date().getTime();
    const thisPlace = await Place.findById(req.params.placeId);
    const newCommment = await Comment.create({
      owner: req.session.user._id,
      description: req.body.description,
      valoration: stars,
      place: thisPlace,
      date: currentDate,
    });
    //console.log("comentario", newCommment);
    res.redirect(`/places/${thisPlace._id}/details`);
    //console.log(newCommment);
  } catch (error) {
    next(error);
  }
});
//POST /comment/:commentId/delete
router.post(
  "/delete/:placeId/:commentId",
  isAdmin,
  updateLocals,
  async (req, res, next) => {
    try {
      const thisPlace = await Place.findById(req.params.placeId);
      const oneComment = await Comment.findByIdAndDelete(req.params.commentId);
      //console.log("comentario a borrar", oneComment);
      res.redirect(`/places/${thisPlace._id}/details`);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

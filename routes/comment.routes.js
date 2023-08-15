const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model");
const Comment = require("../models/Comments.model");
// const User = require("../models/User.model");

//POST /comment/create => Creamos un comentario en nuestra seccion de detalles de los lugares
router.post("/create/:placeId", async (req, res, next) => {
  try {
    const thisPlace = await Place.findById(req.params.placeId);
    const newCommment = await Comment.create({
      owner: req.session.user._id,
      description: req.body.description,
      valoration: req.body.valoration,
      place: thisPlace,
    });
    res.redirect(`/places/${thisPlace._id}/details`)
    // console.log(newCommment);
  } catch (error) {
    next(error);
  }
});


module.exports = router;

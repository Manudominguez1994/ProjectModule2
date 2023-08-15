const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model");
const Comment = require("../models/Comments.model");
// const User = require("../models/User.model");
const { isLoggedIn, isAdmin,updateLocals } = require("../middlewares/auth.middlewares");

//POST /comment/create => Creamos un comentario en nuestra seccion de detalles de los lugares
router.post("/create/:placeId", async (req, res, next) => {
  
  try {
    const currentDate = new Date().getTime()
    const thisPlace = await Place.findById(req.params.placeId);
    const newCommment = await Comment.create({
      owner: req.session.user._id,
      description: req.body.description,
      valoration: req.body.valoration,
      place: thisPlace,
      date: currentDate
    });
    console.log("comentario",newCommment);
    res.redirect(`/places/${thisPlace._id}/details`)
    //console.log(newCommment);
  } catch (error) {
    next(error);
  }
});
//POST /comment/:commentId/delete
router.post("/delete/:placeId/:commentId",isAdmin,updateLocals, async(req, res, next)=>{
    try {
        const thisPlace = await Place.findById(req.params.placeId);
        const oneComment = await Comment.findByIdAndDelete(req.params.commentId)
        console.log("comentario a borrar", oneComment);
        res.redirect(`/places/${thisPlace._id}/details`)
    } catch (error) {
        next(error)
    }
})


module.exports = router;

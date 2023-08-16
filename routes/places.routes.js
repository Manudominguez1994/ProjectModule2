const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model");
const Comment = require("../models/Comments.model");
const pronvincesArr = require("../utils/provinces");
const uploadImg = require("../middlewares/cloudinary.middlewares");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares");

//GET /places/:dinamico => Renderizamos la vista de nuestro lista de lugares filtrados por provincias
router.get("/:province", async (req, res, next) => {
  
  // console.log("miprovicia",req.params.province);
 try{
    const allPlaces = await Place.find({province: req.params.province})
    // console.log("todos mis lugares filtrados",allPlaces);
    res.render("places/list-places.hbs",{allPlaces});
  } catch (error) {
    next(error);
  }
});
//GET /places/create-place=> Renderizamos la vista de crear un lugar
router.get("/create/place", (req, res, next) => {
  res.render("places/new-place.hbs",{pronvincesArr});
});
//POST /places/create-place => Creamos el lugar en nuestra base de datos
router.post("/create/place", uploadImg.single("placeImg"), async (req, res, next) => {
  // console.log("nuevo lugar", req.body);
  try {
    //comprobamos si hay un lugar con el mismo nombre o localización
    const placeFound = await Place.findOne({
      $or: [{ name: req.body.name }, { location: req.body.location }],
    });
    if (placeFound !== null) {
      res.status(400).render("places/new-place.hbs",{
        errorMessage:
          "Ya existe un lugar con el mismo nombre o localización",
        pronvincesArr
      });
      return;
    }
    const newPlace = await Place.create({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      placeImg: req.file.path,
      province: req.body.province,
    });
    // console.log("Mi nuevo lugar",newPlace);
    res.redirect(`/places/${newPlace._id}/details`);
  } catch (error) {
    next(error);
  }
});
//GET /places/:placeId=> Renderizamos la vista de detalles de un lugar
router.get("/:placeId/details",isLoggedIn,async(req, res, next)=>{
  // const {placeId} = req.params
  try {
    const allComments = await Comment.find({place: req.params.placeId})
    .populate("owner")
    .populate("place");
     
    const placeDetails = await Place.findById(req.params.placeId)
    const cloneAllComments = JSON.parse(JSON.stringify(allComments))
    cloneAllComments.forEach((eachComment) => {
       console.log("cada comentario",eachComment);
      eachComment.date = new Date(eachComment.date).toLocaleString();
    });
    console.log("todos mis comentarios", cloneAllComments);
    res.render("places/place-details.hbs",{placeDetails, cloneAllComments})
  } catch (error) {
    next(error)
  }
})
//GET /places/:placeId/update => Renderizamos vista para editar nuestro lugar
router.get("/:placeId/update",isAdmin,async(req, res, next)=>{
  try {
    const onePlace = await Place.findById(req.params.placeId)
    //console.log(onePlace)
    res.render("places/update-places.hbs",{
      onePlace
    })
  } catch (error) {
    next(error)
  }
})
//POST /place/:placeId/update => Actualizamos los datos de DB
router.post("/:placeId/update",  uploadImg.single("placeImg"), async(req, res, next)=>{
  const placeId = req.params.placeId;
  const {name, location, description, province} = req.body;
  const placeImg = req.file.path
  try {
   const updatePlace = await Place.findByIdAndUpdate(placeId,{
    name, location, description, placeImg, province,
   });
   //console.log("a ver que nos muestra",updatePlace)
   res.redirect(`/places/${placeId}/details`)

  } catch (error) {
    next(error)
  }
})
//POST /place/:placeId/delete => Borramos un lugar de DB 
router.post("/:placeId/delete", async(req, res, next)=>{
  try {
    const onePlace = await Place.findByIdAndDelete(req.params.placeId)
    res.redirect(`/places/${onePlace.province}`)
  } catch (error) {
    next(error)
  }
})
//Exportamos
module.exports = router;

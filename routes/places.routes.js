const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model");
const uploadImg = require("../middlewares/cloudinary.middlewares");

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
  res.render("places/new-place.hbs");
});
//POST /places/create-place => Creamos el lugar en nuestra base de datos
router.post("/create/place", uploadImg.single("placeImg"), async (req, res, next) => {
  // console.log("nuevo lugar", req.body);

  try {
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
router.get("/:placeId/details",async(req, res, next)=>{
  // const {placeId} = req.params
  try {
    const placeDetails = await Place.findById(req.params.placeId)
    // console.log(placeDetails);
    res.render("places/place-details.hbs",{placeDetails})
  } catch (error) {
    next(error)
  }
})
//GET /places/:placeId/update
router.get("/:placeId/update",async(req, res, next)=>{
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
//POST /place/:placeId/update
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
//POST /place/:placeId/delete
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

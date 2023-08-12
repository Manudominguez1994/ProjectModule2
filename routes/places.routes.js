const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model");
//GET / => Renderizamos la vista de nuestro lista de lugares filtrados por provincias
router.get("/", async (req, res, next) => {
 try{
    res.render("places/list-places.hbs",);
  } catch (error) {
    next(error);
  }
});
//GET /places/create-place=> Renderizamos la vista de crear un lugar
router.get("/create-place", (req, res, next) => {
  res.render("places/new-place.hbs");
});
//POST /places/create-place => Creamos el lugar en nuestra base de datos
router.post("/create-place", async (req, res, next) => {
  console.log("nuevo lugar", req.body);

  try {
    await Place.create({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      placeImg: req.body.placeImg,
      province: req.body.province,
    });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
});
//GET /places/:placeId=> Renderizamos la vista de detalles de un lugar
router.get("/:placeId",async(req, res, next)=>{
  const {placeId} = req.params
  try {
    const placeDetails = await Place.findById(placeId)
    console.log(placeDetails);
    res.render("places/place-details.hbs",{placeDetails})
  } catch (error) {
    next(error)
  }
})
// //POST /places/:placeId => introducimos en la vista los detalles del lugar en concreto
// router.post("/:placeId", async(req, res, next)=>{
  
// })

module.exports = router;

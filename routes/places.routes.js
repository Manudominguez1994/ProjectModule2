const express = require("express");
const router = express.Router();
const Place = require("../models/Place.model");

router.get("/", async (req, res, next) => {
  try {
    const allProvinces = await Place.findOne();
    console.log(allProvinces);
    res.render("index.hbs", { allProvinces });
  } catch (error) {
    next(error);
  }
});

//GET => Renderizamos la vista de crear un lugar
router.get("/create-place", (req, res, next) => {
  res.render("places/new-place.hbs");
});

//POST => Creamos el lugar en nuestra base de datos
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

module.exports = router;

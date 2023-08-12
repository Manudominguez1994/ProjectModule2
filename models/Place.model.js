const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  placeImg: {
    type: String,
    default: String,
  },
  province: {
    type: String,
    enum: ["Almería","Cádiz","Córdoba","Granada","Huelva","Jaén","Málaga","Sevilla"],
  },
});

const Place = model("Place", placeSchema);
module.exports = Place;

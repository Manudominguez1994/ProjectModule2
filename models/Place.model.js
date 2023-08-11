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
    enum: [
      {
        name: "Almería",
        img: String
      },
      {
        name: "Cádiz",
        img: String
      },
      {
        name: "Córdoba",
        img: String
      },
      {
        name: "Granada",
        img: String
      },
      {
        name: "Huelva",
        img: String
      },
      {
        name: "Jaén",
        img: String
      },
      {
        name: "Málaga",
        img: String
      },
      {
        name: "Sevilla",
        img: String
      },
    ],
  },
});

const Place = model("Place", placeSchema);
module.exports = Place;

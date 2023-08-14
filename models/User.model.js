const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImg: {
      type: String,
      default: "https://res.cloudinary.com/dwvmn4fii/image/upload/v1692024366/default-profile.jpg", 
    },
    dateborn: {
      type: Date,
      max:"2005-08-18"
    },
    placeFav: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

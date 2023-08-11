const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role:{
      type: String,
      enum:["user","admin"],
      default:"user"
    },
    profileImg:{
      type:String,
      default: String
    },
    dateborn:{
      type:Date,
      required:true
    },
    placeFav:[
      {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Place"
    }
  ]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;

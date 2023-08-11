const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const commentSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  valoration: Number,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
});

const Comment = model("Comment", commentSchema);
module.exports = Comment;

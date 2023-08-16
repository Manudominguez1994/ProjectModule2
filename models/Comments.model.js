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
  valoration: String,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
  date: {
    type: Date,
  },
});

const Comment = model("Comment", commentSchema);
module.exports = Comment;

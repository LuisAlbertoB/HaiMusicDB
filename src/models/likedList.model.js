const mongoose = require("mongoose");

const LikedList = mongoose.model(
  "LikedList",
  new mongoose.Schema({
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    song: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song",
        }
    ],
  })
);

module.exports = LikedList;
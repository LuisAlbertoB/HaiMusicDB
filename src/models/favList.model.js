const mongoose = require("mongoose");

const FavList = mongoose.model(
  "FavList",
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

module.exports = FavList;
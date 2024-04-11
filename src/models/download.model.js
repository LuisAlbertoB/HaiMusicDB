const mongoose = require("mongoose");

const Download = mongoose.model(
  "Download",
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

module.exports = Download;
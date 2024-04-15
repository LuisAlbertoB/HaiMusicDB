const mongoose = require('mongoose');

const Song = mongoose.model(
    "Song",
    new mongoose.Schema({
        src: String,
        name: String,
        artist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
                
            }
        ],
        disk: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Disk",
            }
        ],

        language: String
    })
);

module.exports = Song;
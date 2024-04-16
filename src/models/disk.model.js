const mongoose = require('mongoose');

const Disk = mongoose.model(
    "Disk",
    new mongoose.Schema({
        name: String,
        type: String,
        artist: String,
        realese_date: String,
        description: String,
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            }
        ]
    })
);

module.exports = Disk;
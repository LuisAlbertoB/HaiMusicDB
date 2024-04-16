const mongoose = require('mongoose');

const Artist = mongoose.model(
    "Artist",
    new mongoose.Schema({
        name: String,
        birthDay: String,
        bio: String,
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            }
        ]
    })
);

module.exports = Artist;
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
        description: String,
        credits: String,
        likes: Number,
        favs: Number,
        downloads: Number,
        created_at: String,
        created_by: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        updated_at: String,
    })
);

module.exports = Song;
const mongoose = require('mongoose');

const Disk = mongoose.model(
    "Disk",
    new mongoose.Schema({
        title: String,
        type: String,
        artist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist"
            }
        ],
        realese_date: String,
        description: String,
        created_at: String,
        updated_at: String
    })
);

module.exports = Disk;
const mongoose = require('mongoose');

const Disk = mongoose.model(
    "Disk",
    new mongoose.Schema({
        name: String,
        type: String,
        artist: String,
        realese_date: String,
        description: String
    })
);

module.exports = Disk;
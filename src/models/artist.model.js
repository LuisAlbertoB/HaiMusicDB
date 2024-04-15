const mongoose = require('mongoose');

const Artist = mongoose.model(
    "Artist",
    new mongoose.Schema({
        name: String,
        birthDay: String,
        bio: String,
    })
);

module.exports = Artist;
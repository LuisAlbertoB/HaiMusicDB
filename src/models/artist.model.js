const mongoose = require('mongoose');

const Artist = mongoose.model(
    "Artist",
    new mongoose.Schema({
        name: String,
        birthDay: String,
        bio: String,
        created_at: String,
        updated_at: String
    })
);

module.exports = Artist;
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.song = require("./song.model");
db.disk = require("./disk.model");
db.artist = require("./artist.model");

db.ROLES = ["user", "admin"];

module.exports = db;
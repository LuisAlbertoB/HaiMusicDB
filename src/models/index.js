const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.song = require("./song.model");
db.disk = require("./disk.model");
db.artist = require("./artist.model");
db.likedlist = require("./likedList.model");
db.favlist = require("./favList.model");
db.downloads = require("./download.model");
db.lenguages = require("./lenguage.model");

db.ROLES = ["user", "admin"];

module.exports = db;
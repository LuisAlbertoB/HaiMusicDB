const mongoose = require("mongoose");

const Lenguage = mongoose.model(
  "Lenguage",
  new mongoose.Schema({
    español: String,
    eanglish: String
  })
);

module.exports = Lenguage;
const db = require('../models');
const Lenguage = db.lenguages;

exports.getAllSongsInSpanish = async (req, res) => {
    try {
      const songs = await Lenguage.find({ español: { $exists: true } });
      res.status(200).json(songs);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  exports.getAllSongsInEnglish = async (req, res) => {
    try {
      const songs = await Lenguage.find({ eanglish: { $exists: true } });
      res.status(200).json(songs);
    } catch (err) {
      res.status(500).send(err);
    }
  };
const db = require('../models');
const LikedList = db.likedList;
const User = db.user;
const Song = db.song;

exports.likeSong = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const song = await Song.findById(req.body.songId);

    if (!user || !song) {
      return res.status(404).send({ message: 'Usuario o canción no encontrados' });
    }

    let likedList = await LikedList.findOne({ user: user._id });

    if (!likedList) {
      likedList = new LikedList({ user: user._id });
    }

    if (!likedList.song.includes(song._id)) {
      likedList.song.push(song._id);
      await likedList.save();
    }

    res.send({ message: "La canción se ha añadido a la lista de 'me gusta' correctamente", likedList });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.unlikeSong = async (req, res) => {
  try {
    const likedList = await LikedList.findOne({ user: req.body.userId });

    if (!likedList) {
      return res.status(404).send({ message: 'Lista de \'me gusta\' no encontrada' });
    }

    const songIndex = likedList.song.indexOf(req.body.songId);

    if (songIndex > -1) {
      likedList.song.splice(songIndex, 1);
      await likedList.save();
    }

    res.send({ message: "La canción se ha eliminado de la lista de 'me gusta' correctamente", likedList });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

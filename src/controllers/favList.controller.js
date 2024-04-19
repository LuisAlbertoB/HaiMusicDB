const db = require('../models');
const FavList = db.favlist;
const User = db.user;
const Song = db.song;

exports.addSongToFavList = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const song = await Song.findById(req.body.songId);

    if (!user || !song) {
      return res.status(404).send({ message: 'Usuario o canción no encontrados' });
    }

    let favList = await FavList.findOne({ user: user._id });

    if (!favList) {
      favList = new FavList({ user: user._id });
    }

    if (!favList.song.includes(song._id)) {
      favList.song.push(song._id);
      await favList.save();
    }

    res.send({ message: "La canción se ha añadido a la lista de favoritos correctamente", favList });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.removeSongFromFavList = async (req, res) => {
  try {
    const favList = await FavList.findOne({ user: req.body.userId });

    if (!favList) {
      return res.status(404).send({ message: 'Lista de favoritos no encontrada' });
    }

    const songIndex = favList.song.indexOf(req.body.songId);

    if (songIndex > -1) {
      favList.song.splice(songIndex, 1);
      await favList.save();
    }

    res.send({ message: "La canción se ha eliminado de la lista de favoritos correctamente", favList });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const db = require("../models");
const Song = db.song;
const Artist = db.artist;
const Disk = db.disk;
const Lenguage = db.lenguages;

exports.createSong = async (req, res) => {
  try {
    let artist = await Artist.findOne({ name: req.body.artist });
    let disk = await Disk.findOne({ name: req.body.disk });

    if (!artist) {
      artist = new Artist({ name: req.body.artist });
      await artist.save();
    }

    if (!disk) {
      disk = new Disk({ name: req.body.disk });
      await disk.save();
    }

    const song = new Song({
      src: req.body.src,
      name: req.body.name,
      artist: artist._id,
      disk: disk._id,
      language: req.body.language
    });

    await song.save();

    const lenguage = new Lenguage({
      [req.body.language]: song._id
    });

    await lenguage.save();

    res.send({ message: "La canción se ha registrado correctamente" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.updateSong = async (req, res) => {
  try {
    let artist = await Artist.findOne({ name: req.body.artist });
    let disk = await Disk.findOne({ name: req.body.disk });

    if (!artist) {
      artist = new Artist({ name: req.body.artist });
      await artist.save();
    }

    if (!disk) {
      disk = new Disk({ name: req.body.disk });
      await disk.save();
    }

    // Primero, obtenemos la canción original antes de la actualización
    const originalSong = await Song.findById(req.params.id);

    const updatedSong = {
      ...req.body,
      artist: artist._id,
      disk: disk._id
    };

    // Actualizamos la canción
    const song = await Song.findByIdAndUpdate(req.params.id, updatedSong, { new: true });

    if (!song) {
      return res.status(404).send({ message: "No se encontró la canción" });
    }

    // Buscamos el documento en la colección 'lenguages' que corresponde al lenguaje de la canción antes de ser actualizada
    const lenguage = await Lenguage.findOne({ $or: [{ 'español': originalSong._id }, { 'english': originalSong._id }] });
    
    // Obtenemos todos los lenguajes
    const lenguages = await Lenguage.find({});
    console.log(lenguages);

    // Si encontramos el documento, lo eliminamos
    if (lenguage) {
      await Lenguage.deleteOne({ _id: lenguage._id });
      
      // Obtenemos todos los lenguajes después de eliminar
      const lenguagesAfterRemove = await Lenguage.find({});
      console.log(lenguagesAfterRemove);
    }

    // Creamos un nuevo documento con los datos de la nueva canción
    const newLenguage = new Lenguage({
      [song.language]: song._id
    });

    // Guardamos el nuevo documento
    await newLenguage.save();

    res.send({ message: "La canción se ha actualizado correctamente", song });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

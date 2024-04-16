const db = require('../models');
const Disk = db.disk;

exports.updateDisk = async (req, res) => {
    const { id } = req.params;
    const { title, type, artist, realese_date, description } = req.body; // songs ha sido eliminado

    try {
        const updatedDisk = await Disk.findByIdAndUpdate(id, { title, type, artist, realese_date, description }, { new: true }); // songs ha sido eliminado de la actualización

        if (!updatedDisk) {
            return res.status(404).send({ message: 'Disco no encontrado' });
        }

        res.status(200).send(updatedDisk);
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el disco' });
    }
};


exports.findDiskWithSongsByName = async (req, res) => {
    const { name } = req.params;

    try {
        const diskWithSongs = await Disk.findOne({ name: name }).populate('songs');

        if (!diskWithSongs) {
            return res.status(404).send({ message: 'Disco no encontrado' });
        }

        res.status(200).send(diskWithSongs);
    } catch (error) {
        res.status(500).send({ message: 'Error al buscar el disco' });
    }
};


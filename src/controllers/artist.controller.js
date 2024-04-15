const db = require('../models');
const Artist = db.artist;

exports.updateArtist = async (req, res) => {
    const { id } = req.params;
    const { name, birthDay, bio } = req.body;

    try {
        const updatedArtist = await Artist.findByIdAndUpdate(id, { name, birthDay, bio }, { new: true });

        if (!updatedArtist) {
            return res.status(404).send({ message: 'Artista no encontrado' });
        }

        res.status(200).send(updatedArtist);
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el artista' });
    }
};

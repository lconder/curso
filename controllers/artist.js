const Artist = require('../models/artist');

async function create_artist(req, res, next) {
    try {
        const artist = await Artist(req.body);
        await artist.save();
        res.status(200).json({artist});
    } catch(e) {
        next(e);
    }
}

module.exports = {
    create_artist
}
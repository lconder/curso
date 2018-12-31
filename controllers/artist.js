const Artist = require('../models/artist');
const Spotify = require('node-spotify-api');
const objects = require('../utils/objects');

const spotify = new Spotify({
    id: '1b71aec0ab1f4c7c83e385aa73feba73',
    secret: '1a383d42158c4a25a093da169f4bd338'
});

async function get_artist_by_spotify_id(req, res, next) {

    try {
        const id_spotify = req.params.id_spotify;
        const  artist = await Artist.findOne({ id_spotify });

        if(!artist) {
            //El artista no existe en la BD debemos buscarlo en Spotify y luego agregarlo
            const url = `https://api.spotify.com/v1/artists/${id_spotify}`;
            spotify
                .request(url)
                .then( artist => {

                    const new_artist = Artist({
                        name: artist.name,
                        id_spotify : artist.id,
                        popularity: artist.popularity,
                        genres: artist.genres,
                        images: artist.images,
                        followers: artist.followers.total
                    });
                    new_artist.save();
                    res.status(200).json(new_artist);

                })
                .catch( err => res.status(500).json(err) );
        } else {
            //El artista si existe en la BD, lo regresamos
            res.status(200).json(artist);
        }

    } catch(e) {
        next(e);
    }

}

async function create_artist(req, res, next) {
    try {
        const artist = await Artist(req.body);
        await artist.save();
        res.status(200).json({artist});
    } catch(e) {
        next(e);
    }
}


async function search_artist(req, res, next) {

    try {
        const query = req.body.query;

        spotify
        .search({ type: 'artist', query})
        .then( artists => {
            let _artists = (artists.artists.items);
            let fullArtists = _artists.map( artist => objects.tinyArtist(artist));
            res.status(200).json({ artists: fullArtists })
        })
        .catch( err => res.status(500).json(err) );

    } catch(e) {
        next(e);
    }

}

module.exports = {
    create_artist,
    search_artist,
    get_artist_by_spotify_id
};
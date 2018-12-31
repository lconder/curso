module.exports = {

    tinyArtist(artist) {
      return {
          name: artist.name,
          id_spotify: artist.id,
          image: artist.images[0].url,
          followers: artist.followers.total,
          external_urls: artist.external_urls
      }

  }

};
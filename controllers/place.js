const Place = require('../models/place');
const googleMaps = require('@google/maps').createClient({
    key: 'AIzaSyDfLOh5wOv8Qa-HdJjFtC7S6USybOwYVOQ',
    Promise: Promise
});

async function create_place(req, res, next) {

}

async function search_place(req, res, next) {

    const query = req.body.query;

    googleMaps.places({
        query
    })
        .asPromise()
        .then( response => res.send(response))
        .catch( err => console.error(err));
}


module.exports = {
    create_place,
    search_place
};
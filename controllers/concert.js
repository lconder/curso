const Concert = require('../models/concert');

async function get_concerts(req, res, next) {
    try { 
        let concerts = await Concert.find();
        res.status(200).json({concerts});
    } catch(e) {
        next(e);
    }
}

async function create_concert(req, res, next) {
    try {
        let concert = await Concert(req.body);
        await concert.save();
        res.status(200).json({concert});
    } catch(e) {
        next(e);
    }
}

module.exports = {
    get_concerts, create_concert
}
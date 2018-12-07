const Concert = require('../models/concert');

async function add_user(req, res, next) {
    const id_concert = req.params.id;
    const id_user = req.body.id_user;

    try {
        let concert = await Concert.findById(id_concert);
        concert.users.push(id_user);
        await concert.save();
        res.status(200).json({concert});
    } catch(e) {
        next(e);
    }
}

async function get_concerts(req, res, next) {
    try { 
        let concerts = await Concert.aggregate([
            {
                $lookup: {
                    from: "artists", localField: "artist", foreignField: "_id", as: "artist"
                }
            },
            {
                $unwind: "$artist"
            }
        ])
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
    get_concerts, 
    create_concert,
    add_user
}
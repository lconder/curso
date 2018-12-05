const User = require('../models/user');

async function get_users(req, res, next) {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (e) {
        next(e);
    }
}

async function get_user(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json({user});
    } catch (e) {
        next(e);
    }
}

async function create_user(req, res, next) {
    try {
        const user = await User(req.body);
        await user.save();
        res.status(200).json({user});
    } catch(e) {
        next(e);
    }
}

module.exports = {
    get_users, create_user, get_user
}
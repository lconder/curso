const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    facebook_id: {type: String},
    ranking : {type: Number, default: 5},
    created_at: {type: Date, select: false, default: Date.now},
    updated_at: {type: Date, select: false, default: Date.now}
});

userSchema.pre('save', next => {
    this.updated_at = new Date();
    next();
});

userSchema.set('toObject', {getters: true});
userSchema.set('toJSON', {getters: true});

module.exports = mongoose.model('User', userSchema);
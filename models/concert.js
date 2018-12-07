const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const concertSchema = new Schema({
    name: {type: String},
    artist : {type: Schema.Types.ObjectId, ref: "Artist"},
    date: {type: Date},
    place: {type: String},
    quota: {type: Number},
    address: {type: String},
    users: {type: [Schema.Types.ObjectId], default: [], ref: "users"},
    hour: {type: String},
    cost: {type: Number, default:0},
    created_at: {type: Date, select: false, default: Date.now},
    updated_at: {type: Date, select: false, default: Date.now}
});

concertSchema.pre('save', next => {
    this.updated_at = new Date();
    next();
});

concertSchema.set('toObject', {getters: true});
concertSchema.set('toJSON', {getters: true});

module.exports = mongoose.model('Concert', concertSchema);
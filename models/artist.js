const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: {type: String},
    id_spotify : {type: String},
    followers : {type: Number, default: 0},
    popularity: {type: Number},
    genres: {type: [String]},
    images: {type: [Object]},
    created_at: {type: Date, select: false, default: Date.now},
    updated_at: {type: Date, select: false, default: Date.now}
},
{ versionKey: false });

artistSchema.pre('save', next => {
    this.updated_at = new Date();
    next();
});

artistSchema.set('toObject', {getters: true});
artistSchema.set('toJSON', {getters: true});

module.exports = mongoose.model('Artist', artistSchema);
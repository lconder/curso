const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
        name: {type: String},
        address : {type: String},
        loc : {type: { type: String, default: "Point" }, coordinates: [Number] },
        ranking: {type: Number, default: 5},
        phone: {type: String},
        email: {type: String},
        images: {type: [Object]},
        active: {type: Boolean, select: false, default: true},
        created_at: {type: Date, select: false, default: Date.now},
        updated_at: {type: Date, select: false, default: Date.now}
    },
    { versionKey: false });

placeSchema.pre('save', next => {
    this.updated_at = new Date();
    next();
});

placeSchema.index({"loc" : "2dsphere"});

placeSchema.set('toObject', {getters: true});
placeSchema.set('toJSON', {getters: true});

module.exports = mongoose.model('Place', placeSchema);
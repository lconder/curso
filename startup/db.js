const mongoose = require('mongoose');
const config = ('../config/db');

module.exports = () => {
    mongoose.Promise = require('bluebird');
    mongoose.connect("mongodb://lconder:novidosN0!@ds239128.mlab.com:39128/curso");
}
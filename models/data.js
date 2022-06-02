const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create data schema & model
const DataSchema = new Schema({
    states: {
        type: String,
    },
    district: {
        type: String,
    }
});


const Data = mongoose.model('data',DataSchema);

module.exports = Data;
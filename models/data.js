const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create data schema & model
const DataSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    }
});


const Data = mongoose.model('data',DataSchema);

module.exports = Data;
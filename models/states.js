const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create State schema & model
const StateSchema = new Schema({
    stateName: {
        type: String,
    }
});


const State = mongoose.model('state',StateSchema);

module.exports = State;
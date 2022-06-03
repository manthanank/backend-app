const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create District schema & model
const DistrictSchema = new Schema({
    districtName: {
        type: String,
    }
});


const District = mongoose.model('district',DistrictSchema);

module.exports = District;
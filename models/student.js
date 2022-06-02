const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const StudentSchema = new Schema({
    states: {
        type: String,
    },
    district: {
        type: String,
    }
});


const Student = mongoose.model('student',StudentSchema);

module.exports = Student;
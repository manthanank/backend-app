const mongoose = require('mongoose');

const Users = mongoose.model('users', {
    name : {type: String},
    age: {type: Number}
});

module.exports = Users;
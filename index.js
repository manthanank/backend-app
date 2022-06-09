const express = require('express');
const mongoose = require('mongoose');

// set up our express app
const app = express();

const cors = require('cors');
app.use(
    cors({
        origin: '*'
    })
)

// connect to mongodb
mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());
// initialize routes

app.use('/api',require('./routes/api'));
app.use('/api',require('./routes/states_api'));
app.use('/api',require('./routes/districts_api'));

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Ready to Go!');
});
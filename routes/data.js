const express = require('express');
const router = express.Router();
const Data = require('../models/data');

// get a list of data from the database
router.get('/data',function(req,res,next){
    Data.find({}).then(function(data){
        res.send(data);
    }).catch(next);
});

// add a new data to database
router.post('/data',function(req,res,next){
    Data.create(req.body).then(function(data){
        res.send(data);
    }).catch(next);
});

// update a data in the database
router.put('/data/:id',function(req,res,next){
    Data.findOneAndUpdate({_id: req.params.id},req.body).then(function(data){
        Data.findOne({_id: req.params.id}).then(function(data){
            res.send(data);
        });
    });
});

// delete a data in the database
router.delete('/data/:id',function(req,res,next){
    Data.findOneAndDelete({_id: req.params.id}).then(function(data){
        res.send(data);
    });
});

module.exports = router;
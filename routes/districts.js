const express = require('express');
const router = express.Router();
const District = require('../models/districts');

// get a list of District from the database
router.get('/districts',function(req,res,next){
    District.find({}).then(function(district){
        res.send(district);
    }).catch(next);
});

// add a new district to database
router.post('/districts',function(req,res,next){
    District.create(req.body).then(function(district){
        res.send(district);
    }).catch(next);
});

// update a district in the database
router.put('/districts/:id',function(req,res,next){
    District.findOneAndUpdate({_id: req.params.id},req.body).then(function(district){
        District.findOne({_id: req.params.id}).then(function(district){
            res.send(district);
        });
    });
});

// delete a district in the database
router.delete('/districts/:id',function(req,res,next){
    District.findOneAndDelete({_id: req.params.id}).then(function(district){
        res.send(district);
    });
});

module.exports = router;
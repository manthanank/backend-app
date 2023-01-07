const express = require('express');
const router = express.Router();
const State = require('../models/states');

// get a list of State from the database
router.get('/states',function(req,res,next){
    State.find({}).then(function(state){
        res.send(state);
    }).catch(next);
});

// add a new state to database
router.post('/states',function(req,res,next){
    State.create(req.body).then(function(state){
        res.send(state);
    }).catch(next);
});

// update a state in the database
router.put('/states/:id',function(req,res,next){
    State.findOneAndUpdate({_id: req.params.id},req.body).then(function(state){
        State.findOne({_id: req.params.id}).then(function(state){
            res.send(state);
        });
    });
});

// delete a state in the database
router.delete('/states/:id',function(req,res,next){
    State.findOneAndDelete({_id: req.params.id}).then(function(state){
        res.send(state);
    });
});

module.exports = router;
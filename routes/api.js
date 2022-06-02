const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// get a list of data from the database
router.get('/data',function(req,res,next){
    Student.find({}).then(function(data){
        res.send(data);
    }).catch(next);
});

// add a new student to database
router.post('/data',function(req,res,next){
    Student.create(req.body).then(function(student){
        res.send(student);
    }).catch(next);
});

// update a student in the database
router.put('/data/:id',function(req,res,next){
    Student.findOneAndUpdate({_id: req.params.id},req.body).then(function(student){
        Student.findOne({_id: req.params.id}).then(function(student){
            res.send(student);
        });
    });
});

// delete a student in the database
router.delete('/data/:id',function(req,res,next){
    Student.findOneAndDelete({_id: req.params.id}).then(function(student){
        res.send(student);
    });
});

module.exports = router;
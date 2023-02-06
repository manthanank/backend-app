const express = require('express');
const router = express.Router();
const Projects = require('../models/projects');

router.get('/projects',(req,res,next) =>{
    Projects.find({}).then((data) =>{
        res.send(data);
    }).catch(next);
});

router.post('/projects',(req,res,next) =>{
    Projects.create(req.body).then((data) =>{
        res.send(data);
    }).catch(next);
});

router.put('/projects/:id',(req,res,next) =>{
    Projects.findOneAndUpdate({_id: req.params.id},req.body).then((data) =>{
        Projects.findOne({_id: req.params.id}).then((data) =>{
            res.send(data);
        });
    });
});

router.delete('/projects/:id',(req,res,next) =>{
    Projects.findOneAndDelete({_id: req.params.id}).then((data) =>{
        res.send(data);
    });
});

module.exports = router;
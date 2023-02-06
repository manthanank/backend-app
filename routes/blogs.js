const express = require('express');
const router = express.Router();
const Blogs = require('../models/blogs');

router.get('/blogs',(req,res,next) =>{
    Blogs.find({}).then((data) =>{
        res.send(data);
    }).catch(next);
});

router.get('/blogs/:id', (req, res, next) => {
    Blogs.findOne({ _id: req.params.id }).then((data) => {
        res.send(data);
    });
});

router.post('/blogs',(req,res,next) =>{
    Blogs.create(req.body).then((data) =>{
        res.send(data);
    }).catch(next);
});

router.put('/blogs/:id',(req,res,next) =>{
    Blogs.findOneAndUpdate({_id: req.params.id},req.body).then((data) =>{
        Blogs.findOne({_id: req.params.id}).then((data) =>{
            res.send(data);
        });
    });
});

router.delete('/blogs/:id',(req,res,next) =>{
    Blogs.findOneAndDelete({_id: req.params.id}).then((data) =>{
        res.send(data);
    });
});

module.exports = router;
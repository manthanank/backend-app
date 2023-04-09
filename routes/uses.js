const express = require('express');
const router = express.Router();
const Uses = require('../models/uses');

router.get('/uses',(req,res,next) =>{
    Uses.find({}).then((data) =>{
        res.send(data);
    }).catch(next);
});

router.get('/uses/:id', (req, res, next) => {
    Uses.findOne({ _id: req.params.id }).then((data) => {
        res.send(data);
    });
});

router.post('/uses',(req,res,next) =>{
    Uses.create(req.body).then((data) =>{
        res.send(data);
    }).catch(next);
});

router.put('/uses/:id',(req,res,next) =>{
    Uses.findOneAndUpdate({_id: req.params.id},req.body).then((data) =>{
        Uses.findOne({_id: req.params.id}).then((data) =>{
            res.send(data);
        });
    });
});

router.delete('/uses/:id',(req,res,next) =>{
    Uses.findOneAndDelete({_id: req.params.id}).then((data) =>{
        res.send(data);
    });
});

module.exports = router;
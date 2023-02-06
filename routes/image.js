const express = require('express');
const router = express.Router();
const Image = require('../models/image');

router.get('/image',(req,res,next) =>{
    Image.find({}).then((data) =>{
        res.send(data);
    }).catch(next);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/coffee/hot', (req, res) => {
    axios.get('https://api.sampleapis.com/coffee/hot')
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

router.get('/coffee/hot/:id', (req, res) => {
    const itemId = req.params.id;
    axios.get('https://api.sampleapis.com/coffee/hot/'+itemId)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

module.exports = router;
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
router.get('/beers/ale', (req, res) => {
    axios.get('https://api.sampleapis.com/beers/ale')
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});
router.get('/switch/games', (req, res) => {
    axios.get('https://api.sampleapis.com/switch/games')
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});
router.get('/wines/reds', (req, res) => {
    axios.get('https://api.sampleapis.com/wines/reds')
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});
router.get('/futurama/info', (req, res) => {
    axios.get('https://api.sampleapis.com/futurama/info')
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});
router.get('/codingresources/codingResources', (req, res) => {
    axios.get('https://api.sampleapis.com/codingresources/codingResources')
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
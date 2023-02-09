const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/trending-repos', (req, res) => {
    const language = req.query.language || 'All';
    const period = req.query.period || 'past_week';
  
    axios.get(`https://api.ossinsight.io/q/trending-repos?language=${language}&period=${period}`)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching data from the API endpoint');
      });
  });

module.exports = router;
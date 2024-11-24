const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/coffee/hot', controllers.getCoffeeHot);
router.get('/beers/ale', controllers.getBeersAle);
router.get('/switch/games', controllers.getSwitchGames);
router.get('/wines/reds', controllers.getWinesReds);
router.get('/futurama/info', controllers.getFuturamaInfo);
router.get('/codingresources/codingResources', controllers.getCodingResources);
router.get('/coffee/hot/:id', controllers.getCoffeeHotById);

module.exports = router;
const axios = require('axios');

const getCoffeeHot = (req, res) => {
  axios
    .get('https://api.sampleapis.com/coffee/hot')
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
};

const getBeersAle = (req, res) => {
  axios
    .get('https://api.sampleapis.com/beers/ale')
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
};

const getSwitchGames = (req, res) => {
  axios
    .get('https://api.sampleapis.com/switch/games')
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
};

const getWinesReds = (req, res) => {
  axios
    .get('https://api.sampleapis.com/wines/reds')
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
};

const getFuturamaInfo = (req, res) => {
  axios
    .get('https://api.sampleapis.com/futurama/info')
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
};

const getCodingResources = (req, res) => {
  axios
    .get('https://api.sampleapis.com/codingresources/codingResources')
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
};

const getCoffeeHotById = (req, res) => {
  const itemId = req.params.id;
  axios
    .get(`https://api.sampleapis.com/coffee/hot/${itemId}`)
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
};

module.exports = {
  getCoffeeHot,
  getBeersAle,
  getSwitchGames,
  getWinesReds,
  getFuturamaInfo,
  getCodingResources,
  getCoffeeHotById,
};

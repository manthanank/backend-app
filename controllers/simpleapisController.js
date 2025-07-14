const axios = require('axios');

const getCoffeeHot = async (req, res, next) => {
  try {
    const { data } = await axios.get('https://api.sampleapis.com/coffee/hot');
    res.send(data);
  } catch (error) {
    next(error);
  }
};

const getBeersAle = async (req, res, next) => {
  try {
    const { data } = await axios.get('https://api.sampleapis.com/beers/ale');
    res.send(data);
  } catch (error) {
    next(error);
  }
};

const getSwitchGames = async (req, res, next) => {
  try {
    const { data } = await axios.get('https://api.sampleapis.com/switch/games');
    res.send(data);
  } catch (error) {
    next(error);
  }
};

const getWinesReds = async (req, res, next) => {
  try {
    const { data } = await axios.get('https://api.sampleapis.com/wines/reds');
    res.send(data);
  } catch (error) {
    next(error);
  }
};

const getFuturamaInfo = async (req, res, next) => {
  try {
    const { data } = await axios.get('https://api.sampleapis.com/futurama/info');
    res.send(data);
  } catch (error) {
    next(error);
  }
};

const getCodingResources = async (req, res, next) => {
  try {
    const { data } = await axios.get(
      'https://api.sampleapis.com/codingresources/codingResources',
    );
    res.send(data);
  } catch (error) {
    next(error);
  }
};

const getCoffeeHotById = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const { data } = await axios.get(
      `https://api.sampleapis.com/coffee/hot/${itemId}`,
    );
    res.send(data);
  } catch (error) {
    next(error);
  }
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

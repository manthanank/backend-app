const jokes = require('../assets/data/jokes.json');

const getJokes = (req, res) => {
  res.json(jokes);
};

const getJokeById = (req, res) => {
  const joke = jokes.find((j) => j.id === parseInt(req.params.id));
  if (!joke) {
    return res.status(404).json({ message: 'Joke not found' });
  }
  res.json(joke);
};

const getRandomJoke = (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
};

module.exports = {
  getJokes,
  getJokeById,
  getRandomJoke,
};

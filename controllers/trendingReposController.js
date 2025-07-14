const axios = require('axios');

exports.getTrendingRepos = (req, res, next) => {
  const language = req.query.language || 'All';
  const period = req.query.period || 'past_week';

  axios
    .get(
      `https://api.ossinsight.io/q/trending-repos?language=${language}&period=${period}`,
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
};

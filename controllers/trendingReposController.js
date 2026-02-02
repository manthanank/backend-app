const axios = require('axios');
const logger = require('../logger');

exports.getTrendingRepos = async (req, res, next) => {
  try {
    const language = req.query.language || 'All';
    const period = req.query.period || 'past_week';

    const response = await axios.get(
      `https://api.ossinsight.io/q/trending-repos?language=${language}&period=${period}`,
    );

    res.json(response.data);
  } catch (error) {
    logger.error('Error fetching trending repos:', error);
    next(error);
  }
};

const express = require("express");
const router = express.Router();
const trendingReposController = require("./controllers/trendingReposController");

router.get("/trending-repos", trendingReposController.getTrendingRepos);

module.exports = router;

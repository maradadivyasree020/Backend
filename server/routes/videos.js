const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const videos = await Video.find()
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(videos);
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const results = await Video.find({ $text: { $search: q } }).sort({ publishedAt: -1 });
  res.json(results);
});

module.exports = router;

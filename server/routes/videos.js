const express = require('express');
const Video = require('../models/Video');
const router = express.Router();

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const videos = await Video.find()
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos' });
  }
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    const results = await Video.find({
      $text: { $search: q }, 
    }).sort({ publishedAt: -1 });

    res.json(results);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos' });
  }
});

router.get('/:videoId', async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await Video.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Error fetching video' });
  }
});

module.exports = router;

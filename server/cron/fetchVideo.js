const axios = require('axios');
const Video = require('../models/Video');
const cron = require('node-cron');
const keys = process.env.YT_API_KEYS.split(',');
let currentKey = 0;

async function fetchYouTubeVideos() {
  const apiKey = keys[currentKey];
  try {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: process.env.SEARCH_QUERY, 
        type: 'video',
        order: 'date',
        maxResults: 10,
        key: apiKey,
      }
    });

    const videos = res.data.items;
    for (let item of videos) {
      const { videoId } = item.id;
      const { title, description, publishedAt, thumbnails } = item.snippet;
      await Video.updateOne(
        { videoId },
        { $setOnInsert: { videoId, title, description, publishedAt, thumbnails } },
        { upsert: true }
      );
    }
  } catch (err) {
    console.log('Error fetching videos:', err.response?.data || err.message);
    if (err.response?.status === 403 && currentKey < keys.length - 1) {
      currentKey++;
    }
  }
}

cron.schedule('*/10 * * * * *', fetchYouTubeVideos);

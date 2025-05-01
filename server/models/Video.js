const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  publishedAt: { type: Date },
  thumbnails: { type: Object },
});

VideoSchema.index({ title: 'text', description: 'text' });

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;

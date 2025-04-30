const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: { type: String, unique: true },
  title: String,
  description: String,
  publishedAt: Date,
  thumbnails: Object,
}, { timestamps: true });

videoSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Video', videoSchema);

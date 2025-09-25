const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: { type: String, required: true },
  public_id: String,
  secure_url: String,
  resource_type: String // 'image' or 'video' etc
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);

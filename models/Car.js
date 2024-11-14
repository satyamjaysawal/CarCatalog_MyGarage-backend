const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }], // Array of tags like car_type, company, dealer
  images: [{ type: String }], // URLs for car images
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);

const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, default: '' },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 5 },
  isPopular: { type: Boolean, default: false },
  heroBanner: { type: String, default: '' },
  introText: { type: String, default: '' },
  featuredVideo: { type: String, default: '' },
  bodyContent: { type: String, default: '' },
  faqs: [{
    question: { type: String },
    answer: { type: String }
  }],
  videoShorts: [{ type: String }],
  socialLinks: {
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
  },
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);

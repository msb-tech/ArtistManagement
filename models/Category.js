const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  emoji: { type: String, default: '⭐' },
  color: { type: String, default: '#DC2626' },
  subCategories: [subCategorySchema]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);

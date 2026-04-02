const Category = require('../models/Category');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Seed initial categories (optional helper)
exports.seedCategories = async (req, res) => {
  const initialCategories = [
    {
      name: 'Singers/Bands Bollywood',
      slug: 'singers-bands-bollywood',
      emoji: '🎤',
      color: '#DC2626',
      subCategories: [
        { name: 'Male Singers', slug: 'male-singers' },
        { name: 'Female Singers', slug: 'female-singers' },
        { name: 'Sufi Singers', slug: 'sufi-singers' },
        { name: 'Bolly-Unplugged', slug: 'bolly-unplugged' },
        { name: 'Playback Singers', slug: 'playback-singers' },
        { name: 'Bands', slug: 'bands' }
      ]
    },
    {
      name: 'Stand-up Comedians',
      slug: 'stand-up-comedians',
      emoji: '😂',
      color: '#B91C1C',
      subCategories: [
        { name: 'Premium', slug: 'premium' },
        { name: 'Corporate', slug: 'corporate' },
        { name: 'Regional', slug: 'regional' }
      ]
    }
  ];

  try {
    await Category.deleteMany();
    const categories = await Category.insertMany(initialCategories);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

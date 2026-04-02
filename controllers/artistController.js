const Artist = require('../models/Artist');

// Get all artists (with optional category & subCategory filtering)
exports.getArtists = async (req, res) => {
  try {
    const { category, subCategory } = req.query;
    let query = {};
    
    if (category) {
      query.category = { $regex: new RegExp(`^${category.replace(/-/g, ' ')}$`, 'i') };
    }
    
    if (subCategory) {
      query.subCategory = { $regex: new RegExp(`^${subCategory.replace(/-/g, ' ')}$`, 'i') };
    }
    
    const artists = await Artist.find(query).sort({ createdAt: -1 });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get featured artists
exports.getFeaturedArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ isPopular: true });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single artist
exports.getArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create artist
exports.createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update artist
exports.updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete artist
exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json({ message: 'Artist deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

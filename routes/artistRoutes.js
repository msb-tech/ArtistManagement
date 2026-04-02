const express = require('express');
const router = express.Router();
const {
  getArtists,
  getFeaturedArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
} = require('../controllers/artistController');
const auth = require('../middleware/auth');

router.get('/', getArtists);
router.get('/featured', getFeaturedArtists);
router.get('/:id', getArtist);
router.post('/', auth, createArtist);
router.put('/:id', auth, updateArtist);
router.delete('/:id', auth, deleteArtist);

module.exports = router;

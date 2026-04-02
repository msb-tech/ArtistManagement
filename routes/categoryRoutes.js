const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  seedCategories
} = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.get('/', getCategories);
router.post('/', auth, createCategory);
router.put('/:id', auth, updateCategory);
router.delete('/:id', auth, deleteCategory);
router.post('/seed', auth, seedCategories);

module.exports = router;

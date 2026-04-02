const express = require('express');
const router = express.Router();
const { login, setupAdmin } = require('../controllers/adminController');

router.post('/login', login);
router.post('/setup', setupAdmin); // Temporary setup route

module.exports = router;

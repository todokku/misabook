const express = require('express');
const router = express.Router();

// Import controller
const bookController = require('../controllers/book');

router.get('/', bookController.getAllBooks);
router.post('/', bookController.insertBooks);

module.exports = router;
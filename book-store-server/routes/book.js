const express = require('express');
const router = express.Router();

// Import controller
const bookController = require('../controllers/book');

router.get('/', bookController.getAllBooks);
router.get('/all', bookController.booksPagination);
router.post('/', bookController.insertBooks);
router.get('/best-seller', bookController.bestSeller);

module.exports = router;
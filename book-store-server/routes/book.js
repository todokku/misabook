const express = require('express');
const router = express.Router();

// Import controller
const bookController = require('../controllers/book');

router.get('/', bookController.getAllBooks);
router.post('/', bookController.insertBooks);
router.get('/all', bookController.booksPagination);
router.post('/ids', bookController.getByIds);
router.get('/best-seller', bookController.bestSeller);
router.get('/:id', bookController.viewBook);

module.exports = router;
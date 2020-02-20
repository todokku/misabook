const express = require('express');
const router = express.Router();

// Import controller
const orderController = require('../controllers/order');

router.get('/', orderController.getAllOrder);
router.post('/', orderController.insertOrder);

module.exports = router;
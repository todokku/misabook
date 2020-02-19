const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.post('/', messageController.saveMessage);

module.exports = router;
const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.get('/', messageController.getAllMessages);
router.post('/', messageController.saveMessage);

module.exports = router;
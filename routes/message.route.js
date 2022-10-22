const express = require('express');

const router = express.Router();
const controller = require('../controllers/message.controller');

router.get('/', controller.getMessages);
router.post('/', controller.postMessage);

module.exports = router;
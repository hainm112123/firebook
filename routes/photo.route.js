const express = require('express');

var router = express.Router();
var controller = require('../controllers/photo.controller');

router.get('/', controller.getPhotos);

module.exports = router;
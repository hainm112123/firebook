const express = require('express');

const router = express.Router();
const controller = require('../controllers/post.controller');
const multer = require('multer');

const upload = multer({dest: "./public/uploads/postPhotos"});

router.get('/', controller.index);

router.post('/', upload.array('photos'), controller.createPost);

module.exports = router;
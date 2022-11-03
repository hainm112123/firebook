const express = require('express');

const router = express.Router();
const controller = require('../controllers/post.controller');
const multer = require('multer');

const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({dest: "./public/uploads/postPhotos"});

router.get('/', authMiddleware.requireAuth, controller.index);

router.post('/', authMiddleware.requireAuth, upload.array('photos'), controller.createPost);

module.exports = router;
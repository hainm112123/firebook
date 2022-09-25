const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth.controller');
const multer = require('multer');

const upload = multer({dest: "./public/uploads/avatars"});

router.get('/signup', controller.signup);
router.get('/login', controller.login);

router.post('/signup', upload.single('avatar'), controller.postSignup);
router.post('/login', controller.postLogin);

module.exports = router;
const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  author: String,
  text: String,
  postTime: Number,
  photoSetId: String,
});

var Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
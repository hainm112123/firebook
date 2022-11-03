const Post = require('../models/post.model');
const User = require('../models/users.model');
const Photo = require('../models/photo.model');

module.exports = {
  index: async function(req, res) {
    var posts = await Post.find({});
    var mappedPosts = [];
    for (var post of posts) {
      var user = await User.findById(post.author);
      var photos = await Photo.findById(post.photoSetId);
      mappedPosts.push({
        authorFirstName: user.firstName,
        authorLastName: user.lastName,
        authorAvatar: user.avatar,
        text: post.text,
        postTime: post.postTime,
        photoSetId: post.photoSetId,
        photos: photos.urls,
      });
    }
    res.render('index', {
      posts: mappedPosts.reverse(),
      currentTime: Date.now(),
    });
  },

  createPost: async function(req, res) {
    if (req.body.text || req.files) {
      var photoUrls = !req.files ? [] : req.files.map(function(photo) {
        return photo.path.split('\\').slice(1).join('/');
      });

      var photos = new Photo({
        urls: photoUrls,
      });
      await photos.save();

      var post = new Post({
        author: req.signedCookies.userId,
        text: req.body.createPostText,
        postTime: Date.now(),
        photoSetId: photos._id.toString(),
      });
      await post.save();
    }
    res.redirect('/');
  }
}
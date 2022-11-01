const Post = require('../models/post.model');
const User = require('../models/users.model');

module.exports = {
  index: async function(req, res) {
    var posts = await Post.find({});
    var mappedPosts = [];
    for (var post of posts) {
      var user = await User.findById(post.author);
      mappedPosts.push({
        authorFirstName: user.firstName,
        authorLastName: user.lastName,
        authorAvatar: user.avatar,
        text: post.text,
        postTime: post.postTime,
        photos: post.photos,
      });
    }
    res.render('index', {
      posts: mappedPosts.reverse(),
      currentTime: Date.now(),
    });
  },

  createPost: async function(req, res) {
    if (req.body.text || req.files) {
      var post = new Post({
        author: req.signedCookies.userId,
        text: req.body.createPostText,
        postTime: Date.now(),
        photos: !req.files ? [] : req.files.map(function(photo) {
          return photo.path.split('\\').slice(1).join('/');
        }),
      });
      await post.save();
    }
    res.redirect('/');
  }
}
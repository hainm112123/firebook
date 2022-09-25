const User = require('../models/users.model');
const md5 = require('md5');

module.exports = {
  signup: function(req, res) {
    res.render('auth/signup');
  },

  login: function(req, res) {
    res.render('auth/login');
  },

  postSignup: async function(req, res) {
    var inputValues = req.body;
    var userExisted = await User.findOne({email: inputValues.email});
    var errors = {
      firstName: inputValues.firstName.trim().length == 0,
      lastName: inputValues.lastName.trim().length == 0,
      emailLength: inputValues.email.trim().length == 0,
      emailExisted: userExisted ? 1 : 0,
      password: inputValues.password.length < 6,
    };
    for (var key in errors) if (errors[key]) {
      res.render('auth/signup', {
        errors: errors,
        inputValues: inputValues,
      });
      return;
    }

    const defaultAvatar = '/uploads/avatars/88724849_p0_master1200.jpg';
    var user = new User({
      firstName: inputValues.firstName.trim(),
      lastName: inputValues.lastName.trim(),
      email: inputValues.email.trim(),
      password: md5(inputValues.password),
      date: inputValues.date,
      month: inputValues.month,
      year: inputValues.year,
      gender: inputValues.gender,
      avatar: req.file ? "/" + req.file.path.split('\\').slice(1).join('/') : defaultAvatar,
    });

    await user.save();

    res.cookie('userId', user._id.toString(), {signed: true});
    res.redirect('/');
  },

  postLogin: async function(req, res) {
      var user = await User.findOne({email: req.body.email});
      var errors = {
        email: user ? 0 : 1,
        password: (user && user.password != md5(req.body.password)),
      }
      for (var key in errors) if (errors[key]) {
        res.render('auth/login', {
          errors: errors,
          inputValues: req.body,
        });
        return;
      }
      
      res.cookie('userId', user._id.toString(), {signed: true});
      res.redirect('/');
  }
}
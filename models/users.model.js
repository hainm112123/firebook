const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  date: Number,
  month: Number,
  year: Number,
  gender: String,
  avatar: String,
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;
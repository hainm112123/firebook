const mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  urls: [String],
});

var Photo = mongoose.model('Photo', photoSchema, 'photos');

module.exports = Photo;
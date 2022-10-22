const mongoose = require('mongoose');

var messageShcema = new mongoose.Schema({
  from: String,
  to: String,
  text: String,
});

var Message = mongoose.model('Message', messageShcema, 'messages');

module.exports = Message;
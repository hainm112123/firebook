const Message = require('../models/message.model');

module.exports = {
  getMessages: async function(req, res) {
    var messages = await Message.find({});
    res.send(messages);
  },

  postMessage: async function(req, res) {
    var message = new Message(req.body);
    await message.save();
    res.sendStatus(200);
  },
}
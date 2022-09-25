const User = require('../models/users.model');

module.exports = {
  checkData: async function(req, res, next) {
    var user = await User.findById(req.signedCookies.userId);
    res.locals.user = user;
    next();
  }
}
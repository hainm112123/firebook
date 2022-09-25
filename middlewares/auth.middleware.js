const User = require('../models/users.model');

module.exports = {
  requireAuth: async function(req, res, next) {
    if (!req.signedCookies.userId) {
      res.redirect('/auth/login');
      return;
    }

    var user = await User.findById(req.signedCookies.userId);
    if (!user) {
      res.redirect('auth/login');
      res.clearCookie('userId');
      return;
    }

    next();
  },

  authed: async function(req, res, next) {
    if (!req.signedCookies.userId) {
      next();
      return;
    }

    var user = await User.findById(req.signedCookies.userId);
    if (user) {
      res.redirect('/');
      return;
    }

    next();
  }
}
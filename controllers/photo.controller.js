const Photo = require('../models/photo.model');

module.exports = {
  getPhotos: async function(req, res) {
    if (!req.query.set) {
      res.redirect('/');
      return;
    }
    var photos = await Photo.findById(req.query.set);
    if (photos.length < 1) {
      res.redirect('/');
      return;
    }
    var index = req.query.index ? req.query.index : '0';
    res.render('photo/index', {
      url: photos.urls[index],
      index: parseInt(index),
      set: req.query.set,
      firstPhoto: (parseInt(index) === 0),
      lastPhoto: (parseInt(index) === photos.urls.length - 1),
      baseUrl: req.baseUrl,
    })
  } 
}
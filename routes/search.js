var mongoose = require('mongoose')
var Hymn = mongoose.model('Hymn')

module.exports = function(server, logger) {

  server.get('/search', function(req, res, next) {
    var keyword = req.query.keyword

    // find junk
    Hymn.find({
      $or: [{
        title: new RegExp(keyword, 'i')
      }, {
        lyrics: new RegExp(keyword, 'i')
      }, {
        author: new RegExp(keyword, 'i')
      }, {
        hymn_number: new RegExp(keyword, 'i')
      }, ]
    }, 'title hymn_number', function(err, data) {
      var results = data
      res.send({
        'results': results
      })
      return next();
    })
  });

  server.get('/hymn/:id', function(req, res, next) {
    Hymn.find({
      _id: req.params.id
    }, function(err, data) {
      var results = data
      res.send({
        'results': results
      })
      return next();
    })
  })

};
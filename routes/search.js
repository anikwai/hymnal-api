var mongoose = require('mongoose')
var Hymn = mongoose.model('Hymn')

// TODO: move this to a hymnCntrl.js that will export the search function and
// any relevant CRUD methods.
module.exports = function(server, logger) {

  /**
   * Searches the mongo database for hymns that match the keyword(s)
   */
  server.get('/search', function(req, res, next) {
    var keyword = req.query.keyword

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

  /**
   * Gets the hymn with the specified id.
   */
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
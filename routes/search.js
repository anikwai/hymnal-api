var mongoose = require('mongoose')
var Schema = mongoose.Schema
var url = 'mongodb://localhost'
mongoose.connect(url + '/test')

var HymnSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  number: {
    type: Number
  },
  lyrics: {
    type: String
  },
})

module.exports = function(server, logger) {

  // Mongo db connection info
  var Hymn = mongoose.model('Hymn', HymnSchema)
  var db = mongoose.connection
  db.on('error', function() {
    logger.info(arguments)
  })
  db.once('open', function() {
    logger.info('connected to db.')
  })

  var titles = ["Alas and did", "Come thou fount"]

  // Sample route
  server.get('/search', function(req, res, next) {
    var keyword = req.query.keyword

    // find junk
    Hymn.find({
      title: new RegExp(keyword)
    }, function(err, data) {
      results = data
      res.send({
        'results': results
      })
      return next();
    })
  });

};
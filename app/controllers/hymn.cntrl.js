var mongoose = require('mongoose')
var Hymn = mongoose.model('Hymn')
var logger

module.exports = {
  init: init,
  getAll: getAll,
  getById: getById,
}

function init(opts) {
  logger = opts.logger
}

function getAll(req, res) {
  var keyword = req.query.keyword
  if (keyword) {
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
    }, 'title hymn_number', returnResults)
  } else {
    Hymn.find({}, returnResults)
  }

  function returnResults(err, data) {
    var results = data
    res.send({
      'results': results
    })
  }
}

function getById(req, res) {
  logger.debug('Making db query with params=', req.params)
  Hymn.findOne({
    _id: req.params.id
  }, function(err, data) {
    var results = data
    res.send({
      'results': results
    })
  })
}
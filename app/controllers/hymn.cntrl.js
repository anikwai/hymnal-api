'use strict';

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
  // Build MongoQuery object
  var mQuery = {
    $or: [],
  }

  // Build each one as an $or matching everything
  var searchTerms = []
  Object.keys(req.query).forEach(function(attr) {
    var value = req.query[attr]
    if (attr == 'expanded') return;
    searchTerms.push(value)
    var attrQuery = {}
    attrQuery[attr] = new RegExp(value, 'i')
    mQuery.$or.push(attrQuery)
  })

  // If looking for a phrase
  var words = []
  if (req.query.phrase) {
    words = req.query.phrase.split(" ")
    var regex = words.join('[!()\\\"+?,\\s-_\\\':;\\n]*')
    var regExp = new RegExp(regex, 'i')
    mQuery.$or.push({'lyrics': regExp})
  }

  // Include all words, searching in lyrics
  if (Boolean(req.query.expanded) == true) {
    var regExp = new RegExp('(' + searchTerms.join('|') + ')', 'i')
    mQuery.$or.push({'lyrics': regExp})
    var and = {$and: [] }
    words.forEach(function(elem) {
      and.$and.push({'lyrics': new RegExp(elem, 'i') })
    });
    mQuery.$or.push(and)
  }

  if (mQuery.$or.length > 0) {
    Hymn
      .find(mQuery, 'title hymn_number')
      .exec(returnResults)
  } else {
    Hymn.find({}, returnResults)
  }

  function returnResults(err, data) {
    var results = data.sort(function(a, b) {
      return Number(a.hymn_number) - Number(b.hymn_number)
    })
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
    res.send(data)
  })
}
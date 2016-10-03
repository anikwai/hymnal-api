'use strict';

var _ = require('underscore')
var mongoose = require('mongoose')
var Feedback = mongoose.model('Feedback')
var logger

module.exports = {
  init: init,
  feedback: feedback,
  createFeedback: createFeedback,
}

function init(opts) {
  logger = opts.logger
}

function feedback(req, res, next) {
  Feedback.find(function(err, data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
    next()
  })
}

function createFeedback(req, res, next) {
  var instance = new Feedback();
  ['ref_hymn_id', 'user_contact_info', 'feedback_message'].forEach(function(field) {
    instance[field] = req.body[field]
  })

  instance.save(function(error) {
    if (error) {
      res.send(error)
    } else {
      res.send()
    }
    next()
  })
}
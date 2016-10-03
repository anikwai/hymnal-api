/* global __dirname:true */
'use strict';
var hymnCntrl = require('./controllers/hymn.cntrl')
var feedbackCntrl = require('./controllers/feedback.cntrl')
var mainCntrl = require('./controllers/main.cntrl')

module.exports = function(server, logger) {
  hymnCntrl.init({logger: logger})
  mainCntrl.init({logger: logger})
  feedbackCntrl.init({logger: logger})
  server.get('/', mainCntrl.home)
  server.get('/hymn', hymnCntrl.getAll)
  server.get('/hymn/:id', hymnCntrl.getById)
  server.get('/feedback', feedbackCntrl.feedback)
  server.post('/feedback', feedbackCntrl.createFeedback)
};
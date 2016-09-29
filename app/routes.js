/* global __dirname:true */
'use strict';
var hymnCntrl = require('./controllers/hymn.cntrl')

module.exports = function(server, logger) {
  hymnCntrl.init({logger: logger})
  server.get('/hymn', hymnCntrl.getAll)
  server.get('/hymn/:id', hymnCntrl.getById)
};
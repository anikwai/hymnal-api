/**
 * Script is used to populate a database, based on a map of hymn names and their
 * details.
 */
var mongoose = require('mongoose')
var _ = require('underscore')
var fs = require('fs')

// DB Models
require('../model/hymn')

// set defauls
var url = 'mongodb://localhost/'
var db = 'test'

var Hymn = mongoose.model('Hymn')
mongoose.connect(url + db)

// Clear old data
Hymn.remove({})

// Get hymn list from somewhere.
var hymns = require('./data/all_hymns.json')

// Populate data.
var p = []
Object.keys(hymns).forEach(function(key) {
  var o = hymns[key]
    // console.log(o);
  var instance = new Hymn()
  _.extend(instance, o)
  p.push(instance.save())
})

Promise.all(p).then(function() {
  console.log('Done')
  mongoose.connection.close()
})

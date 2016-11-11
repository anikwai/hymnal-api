/**
 * Script is used to populate a database, based on a map of hymn names and their
 * details.
 */
var mongoose = require('mongoose')
var _ = require('underscore')
var fs = require('fs')

// Get environment configs
require('dotenv').config()

// DB Models
var url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds041566.mlab.com:41566/christian_songs`
console.log(`Connecting to ${url}`)
var Hymn = require('../app/models/hymn')
mongoose.connect(url)

// Clear old data
// console.log(`Removing data.`)
// Hymn.remove({})

// Get hymn list from somewhere.
var hymns = require('trinity-hymnal-data')

// Populate data.
var p = []
hymns.forEach(function(hymn) {
  var instance = new Hymn()
  instance.title = hymn.title
  instance.author = hymn.author
  instance.hymn_number = hymn.number
  instance.lyrics = hymn.lyrics
  instance.first_line = hymn.first_line
  instance.tune = hymn.tune
  p.push(instance.save())
})

Promise.all(p).then(function() {
  console.log('Done')
  mongoose.connection.close()
})

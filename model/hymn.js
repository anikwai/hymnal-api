var mongoose = require('mongoose')
var Schema = mongoose.Schema

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

mongoose.model('Hymn', HymnSchema);
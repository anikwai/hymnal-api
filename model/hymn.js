var mongoose = require('mongoose')
var Schema = mongoose.Schema

var HymnSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  hymn_number: {
    type: String
  },
  lyrics: {
    type: String
  },
  first_line: {
    type: String
  },
})

mongoose.model('Hymn', HymnSchema);
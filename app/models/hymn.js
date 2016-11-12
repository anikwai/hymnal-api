var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema for hymns
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
  tune: {
    type: String
  },
})

// Ensure first line is populated
HymnSchema.pre('save', function(next) {
  this.first_line = getFirstLine(this.lyrics)
  next()
})
function getFirstLine(lyrics) {
  return lyrics.toString().replace(/\n.*/gm,'')
}

// Export for convenience
module.exports = mongoose.model('Hymn', HymnSchema);
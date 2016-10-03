var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema for hymns
var FeedbackSchema = new Schema({
  ref_hymn_id: {
    type: String,
  },
  uer_contact_info: {
    type: String,
  },
  feedback_message: {
    type: String,
  },
})

module.exports = mongoose.model('Feedback', FeedbackSchema);
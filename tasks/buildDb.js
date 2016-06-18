var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.ObjectId

// set defauls
var url = 'mongodb://localhost/'
var db = 'test'

var modelName = 'Hymn'

// build mongoose connections
var HymnSchema = new Schema({
  title: {type: String},
  author: {type: String},
  number: {type: Number},
  lyrics: {type: String},
})

mongoose.connect(url + db)
var Model = mongoose.model(modelName, HymnSchema)
Model.remove({}, loga)

// get data
var getData = function() {
  return [
    {
      title: 'Alas and Did',
      number: 195,
    },
    {
      title: 'O Come, O come, Emmanuel',
      number: 147,
    },
  ]
}


// push data

getData().forEach(function(o) {
  var instance = new Model()
  instance.title = o.title
  instance.number = o.number
  instance.auther = o.auther
  instance.lyrics = o.lyrics
  instance.save(loga).then(function() {
    mongoose.connection.close()
  })
})

console.log('Db contains: ', Model.count(), ' docs')

// logs arguments
function loga() {
  console.log(arguments)
}

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('promise')
var _ = require('underscore')

// set defauls
var url = 'mongodb://localhost/'
var db = 'test'

var modelName = 'Hymn'

// build mongoose connections
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

mongoose.connect(url + db)
var Model = mongoose.model(modelName, HymnSchema)
Model.remove({}, loga)

// get data
var getData = function() {
  return [{
    title: 'Alas and Did',
    number: 195,
  }, {
    title: 'O Come, O come, Emmanuel',
    number: 147,
  }, ]
}


// push data
var p = []
getData().forEach(function(o) {
  var instance = new Model()
  _.extend(instance, o)
  p.push(instance.save(loga))
})

Promise.all(p).then(function() {
  mongoose.connection.close()
})

console.log('Db contains: ', Model.count(), ' docs')

// logs arguments
function loga() {
  // console.log(arguments)
}
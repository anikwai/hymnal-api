var mongoose = require('mongoose')
var Schema = mongoose.Schema
var _ = require('underscore')
var fs = require('fs')

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
  hymn_number: {
    type: Number
  },
  lyrics: {
    type: String
  },
})

var Model = mongoose.model(modelName, HymnSchema)
mongoose.connect(url + db)
Model.remove({}, loga)
// mongoose.connection.close()


// get data
var getData = function() {

  var hymns_text = fs.readFileSync(__dirname + '/all_hymns.html', 'utf8').split('=HYMN END=')
  var hymns = []
  var counter = 0
  hymns_text.forEach(function(hh) {
    var hymn = {}

    var heading = hh.match(/h3>(.*[a-z])\&.*;(.*)<\/h3/)
    if (heading) {
      hymn.title = heading[1]
      hymn.author = heading[2]
    }

    var meta = hh.match(/p>\n(.*), #([0-9]{1,3})<br/)
    if (meta) {
      hymn.source = meta[1]
      hymn.hymn_number = meta[2]
    }

    var text = hh.split(/\n\n<p>\n.*<br\s\/>\n/)
    if (text[1]) {
      var without_tags = text[1].split(/<\/p>/)[0].replace(/<br \/>/g, '')
      hymn.text = without_tags
    }
    // Some just don't have authors
    if (!hymn.title || /*!hymn.author ||*/ !hymn.text) {
      //counter++;
      // console.log(hymn)
    } else {
      hymns.push(hymn)
    }

    // console.log(hymn)
  })


  // console.log(counter)
  // hymns.push(hymn)
  next(hymns)
}

function next(hymns) {

  // push data
  var p = []
  hymns.forEach(function(o) {
    console.log(o);
    var instance = new Model()
    _.extend(instance, o)
    p.push(instance.save(loga))
  })

  Promise.all(p).then(function() {
    console.log('Done')
    mongoose.connection.close()
  })

}
// console.log('Db contains: ', Model.count(), ' docs')

// logs arguments
function loga() {
  // console.log(arguments)
}

getData()

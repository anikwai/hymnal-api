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
  first_line: {
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
  var hymns = {
    // number: {
    //   title:
    //   auther:
    //   lyrics:
    //   first_line:
    // }
  }
  var counter = 0
  hymns_text.forEach(function(hh) {
    var hymn = {}

    var heading = hh.match(/h3>(.*[a-z])\&.*;(.*)<\/h3/)
    if (heading) {
      hymn.title = heading[1]
      hymn.author = heading[2]
    }

    var hymnNumberMatch = hh.match(/Original  Trinity Hymnal, #([0-9]+)/)
    if (hymnNumberMatch) {
      hymn.hymn_number = hymnNumberMatch[1]
    }

    // Hymn content
    var lyrics = hh.split(/\n\n<p>\n.*<br\s\/>\n/)
    if (lyrics[1]) {
      hymn.lyrics = ''

      // stanzas
      var content = hh.split("Original  Trinity")
      content = content[1].split("\n<br />\n")
      content.shift()
      content.pop()
      content.forEach(function(stanza) {
        hymn.lyrics += stanza.replace(/<br \/>/g, '') + '\n\n'
      })

      hymn.first_line = hymn.lyrics.split('\n')[0]
    }
    // Some just don't have authors
    if (hymn.hymn_number) {
      if (hymn.title && /*!hymn.author ||*/ hymn.lyrics) {

        // duplicates?
        if (!hymns[hymn.title]) {
          hymns[hymn.title + "__" + hymn.author] = hymn
        } else {
          // ignore duplicates for now.
          // console.error('dup: ', hymn.title);
        }
      } else {
        // console.log('not put: ', hymn)
      }
    }

    // console.log(hymn)
  })


  // Validate parsing.

  // console.log(counter)
  // hymns.push(hymn)
  // Hymns have unique numbers, thus!
  next(hymns)
}

function next(hymns) {

  // push data
  var p = []
  Object.keys(hymns).forEach(function(key) {
    var o = hymns[key]
    // console.log(o);
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
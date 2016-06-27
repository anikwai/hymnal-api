var mongoose = require('mongoose')
var Schema = mongoose.Schema
var _ = require('underscore')
var request = require('request')

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

  var counter = 0;
  var hymns = []
  var interval = setInterval(function() {

    request('http://www.opc.org/hymn.html?hymn_id=' + counter, (err, res, body) => {
      try {
        var opening = '<p class="nav"><a href="/hymn.html?target=archive">Archive of All Entries</a> </p>'
        var ending = '<div class="printMe">'
        body = body.slice(body.indexOf(opening), body.indexOf(ending))
        console.log(body)
        console.log('=HYMN END=')

/*
        var HtmlDom = require('htmldom')
        var html = new HtmlDom(body)
        var text = ""
          // console.log(html.$('p')[1].children)
        for (var c of html.$('p')[1].children) {
          // console.log(c)
          text += c.value ? c.value : ''
        }
        var hymn = {
          title: html.$('h3')['0'].children[0].value,
          text: text.replace(/\r/g, '\n')
        }
        console.log(hymn)
        hymns.push(hymn)
        */
      } catch (e) {

      }
    })

    counter++;

    if (counter > 859) {
    // if (counter > 10) {
      clearInterval(interval)
      // next(hymns)
    }
  }, 100);
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
    mongoose.connection.close()
  })

}
// console.log('Db contains: ', Model.count(), ' docs')

// logs arguments
function loga() {
  // console.log(arguments)
}

getData()
var fuzzy = require('fuzzy')

module.exports = function(server, logger) {

  var titles = ["Alas and did", "Come thou fount"]
  
  // Sample route
  server.get('/search', function (req, res, next) {
    var keyword = req.query.keyword
    var results
    if (keyword) {
      results = fuzzy.filter(keyword, titles)
      results = results.map(function(d) {return d.string})
    } else {
      results = titles
    }
    res.send({'results': results})
    return next();
  });
  
};

'use strict';

var should  = require('chai').should(),
    request = require('supertest'),
    _ = require('underscore')


describe("GET /search", function () {

  it('should return { "results": [...{name: "Alas..."}] }', function (done) {
    request(baseURL)
      .get('/search')
      .query({keyword: 'Alas'})
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        res.body.should.be.an('object');
        res.body.should.have.ownProperty('results');
        res.body.results.length.should.equal(5)
        var matches = _.find(res.body.results, function(o) {
          if (o.title.match(/Alas!/)) return o
        })
        matches.title.should.equal("Alas! and did my Saviour bleed");

        return done();
      });
  });

});

'use strict';

var should  = require('chai').should(),
    request = require('supertest');


describe("GET /search", function () {

  it('should return { "results": ["Alas and did"] }', function (done) {
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
        res.body.results[0].title.should.match(/Alas and did/i);

        return done();
      });
  });

});

'use strict';
/* global __dirname:true */

var path = require('path');

const routes = [
  'search'
];

module.exports = function(server, logger) {

  routes.forEach(function(route) {
    try {
      require(path.join(__dirname, route))(server, logger);
    } catch (err) {
      throw new Error("Can't load '" + route + "' route");
    }
  });
};
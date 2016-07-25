/* global process:true, __dirname:true */

'use strict';

var path = require('path')
var restify = require('restify')
var config = require('config')
var routes = require('./routes')

var mongoose = require('mongoose')
var url = 'mongodb://localhost'
mongoose.connect(url + '/test')
require('./model/hymn')

exports.createServer = createServer;

/*
 * Set up server
 * @return the created server
 */
function createServer(logger) {

  var db = mongoose.connection
  db.on('error', function() {
    logger.info(arguments)
  })
  db.once('open', function() {
    logger.info('connected to db.')
  })

  var settings = {
    name: (config.has('server.name') && config.get('server.name')) ? config.get('server.name') : require(path.join(__dirname, 'package')).name
  };

  if (logger) settings.log = logger;

  var server = restify.createServer(settings);

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.CORS());

  server.on('NotFound', function(req, res, next) {
    if (logger) {
      logger.debug('404', 'No route that matches request for ' + req.url);
    }
    res.send(404, req.url + ' was not found');
  });

  if (logger) server.on('after', restify.auditLogger({
    log: logger
  }));

  routes(server, logger);

  return server;
}
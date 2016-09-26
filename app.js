'use strict';

var path = require('path')
var restify = require('restify')
var config = require('config')
var routes = require('./routes')

// use 'dotenv' for environment loading.
var url = 'mongodb://localhost'

// TODO: consider moving mongo instance to mLab for free db mgmt.
var mongoose = require('mongoose')
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
    res.send(new restify.NotFoundError())
  });

  if (logger) server.on('after', restify.auditLogger({
    log: logger
  }));


  // TODO: require single routes.js file that will setup each route.
  routes(server, logger);

  return server;
}
'use strict';

var path = require('path')
var restify = require('restify')
var config = require('config')

// DB
var db = config.get('database')
var url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${db.host}:${db.port}/${db.name}`
var mongoose = require('mongoose')
mongoose.connect(url)
require('./app/models/hymn')

// Routes
var routes = require('./app/routes')

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

  // Setup each route.
  routes(server, logger);

  return server;
}
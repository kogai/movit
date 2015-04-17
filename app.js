var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');
var logger = require('util/logger').getLogger('app');
var reactServer = require('asset/react/Server');

server.connection({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './public'
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: reactServer
});

server.start(function(err){
  'use strict';
  logger.info('server running on ' + (process.env.PORT || server.info.port) + '...');
});

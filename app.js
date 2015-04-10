var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');
var logger = require('util/logger').getLogger('app');

server.connection({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './asset/public'
    }
  }
});

server.views({
    engines: {
      jade: require('jade')
    },
    path: path.join(__dirname, 'view')
});

server.route({
  method: 'GET',
  path: '/',
  handler: function ( req, reply ) {
    'use strict';
    reply.view('index');
  }
});

server.start(function(err){
  'use strict';
  logger.info('server running on ' + (process.env.PORT || server.info.port) + '...');
});
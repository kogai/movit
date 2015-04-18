var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');
var Bcrypt = require('bcrypt');
var Basic = require('hapi-auth-basic');
var Bell = require('bell');

var logger = require('util/logger').getLogger('app');
var twitter = require('credential').twitter;
var reactServer = require('asset/react/Server');

server.connection({
  host: 'localhost',
  port: 3000
});

server.register(Bell, function(err) {
  'use strict';
  if(err){
    console.log('register-err', err);
  }
  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'secret',
    isSecure: false,
    clientId: twitter.clientId,
    clientSecret: twitter.clientSecret
  });

  server.route({
    method: '*',
    path: '/bell/door',
    config: {
      auth: 'twitter',
      // handler: reactServer
      handler: function(request, reply) {
        console.log('request.auth-twitter', request.auth);
        if (!request.auth.isAuthenticated) {
          // reply('Authentication failed due to: ' + request.auth.error.message);
        }
        reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/public/{p*}',
    handler: {
      directory: {
        path: './public'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: reactServer
  });

  server.start(function() {
    console.log('server running at: ' + server.info.uri);
  });
});

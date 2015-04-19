var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');
var Bcrypt = require('bcrypt');
var Basic = require('hapi-auth-basic');
var Bell = require('bell');

var logger = require('util/logger').getLogger('app');
var twitter = require('credential').twitter;
var cookie = require('credential').cookie;

var route = require('route/');

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
    password: cookie,
    clientId: twitter.clientId,
    clientSecret: twitter.clientSecret,
    isSecure: false
  });

  // Route config
  server.route(route.bell.door);
  server.route(route.public.wc);
  server.route(route.wc);

  server.start(function() {
    logger.info('server running at: ' + server.info.uri);
  });
});

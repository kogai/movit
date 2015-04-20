var Hapi = require('hapi');
var server = new Hapi.Server();

var path = require('path');
var Bcrypt = require('bcrypt');
var Bell = require('bell');
var Cookie = require('hapi-auth-cookie');

var logger = require('util/logger').getLogger('app');
var twitter = require('credential').twitter;
var cookie = require('credential').cookie;

var route = require('route/');

server.connection({
  host: 'localhost',
  port: 3000
});

server.views({
  engines: { jade: require('jade') },
  path: __dirname + '/view'
});

server.register([Bell, Cookie], function(err) {
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

  server.auth.strategy('session', 'cookie', {
    password: cookie,
    cookie: 'twitter',
    redirectTo: '/',
    redirectOnTry: false,
    isSecure: false
  });

  // Route config
  server.route(route.bell.door);
  server.route(route.public.wc);
  server.route(route.client.root);

  server.start(function() {
    logger.info('server running at: ' + server.info.uri);
  });
});

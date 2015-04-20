var Hapi = require('hapi');
var server = new Hapi.Server();
var io = require('socket.io');
var Twitter = require('twitter');

var path = require('path');
var Bcrypt = require('bcrypt');
var Bell = require('bell');
var Cookie = require('hapi-auth-cookie');

var logger = require('util/logger').getLogger('app');
var twitter = require('credential').twitter;
var cookie = require('credential').cookie;

var route = require('route/');

var client = new Twitter({
  consumer_key: twitter.clientId,
  consumer_secret: twitter.clientSecret,
  access_token_key: twitter.accessToken,
  access_token_secret: twitter.accessTokenSecret
});

var clientParam = {
  track: 'iamchawan'
};

client.stream('statuses/filter', clientParam, function (stream) {
  'use strict';

  stream.on('data', function(tweet) {
    logger.info(tweet);
    if(tweet.text){
      console.log(tweet.user.screen_name + ':' + tweet.text);
    }
  });

  stream.on('error', function(error) {
    logger.info(error);
    throw error;
  });
});

server.connection({
  host: 'localhost',
  port: 3000
});

io = io.listen(server.listener);

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
    isSecure: false,
    isHttpOnly: false
  });

  // Route config
  server.route(route.bell.door);
  server.route(route.bell.regist);
  server.route(route.public.wc);
  server.route(route.client.root);
  server.route(route.client.edit);
  server.route(route.client.page);

  server.start(function() {
    logger.info('server running at: ' + server.info.uri);
  });

  io.on('connection', function (socket) {
    console.log('socket');
  });
});

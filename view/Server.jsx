var React = require('react');
var Router = require('react-router');
var renderToStringAsync = require('react-async').renderToStringAsync;

var Index = require('./Index');

var isAuthenticated = require('./util/Helper').isAuthenticated;
var logger = require('util/logger').getLogger('Server');
var User = require('model/User');

module.exports = function (request, reply) {
  'use strict';
  console.log('server', request.auth.credentials);

  if (!request.auth.isAuthenticated) {
    // return reply('Authentication failed due to: ' + request.auth.error.message);
  }else{
    User.findOne({
      twitter: {
        profile: {
          id: request.auth.credentials.id
        }
      }
    }, function (err, user) {
      if(err) {
        logger.info(err);
        return reply.redirect('/');
      }
      if(!user){
        var newUser = new User({
          twitter: {
            profile: {
              id: request.auth.credentials.id,
              username: request.auth.credentials.username,
              displayName: request.auth.credentials.displayName
            }
          },
          sequencialPostId: 1,
        });
        newUser.save(function (err) {
          if(err){
            console.log(err);
          }
          logger.info(newUser.twitter.profile.username + ' registerd.')
        });
      }else{
        logger.info(user.twitter.profile.username + ' is already registerd.')
      }
    });
  }

  Router.run(Index, request.path, function (Handler, state) {
    state.params.isAuthenticated = request.auth.isAuthenticated;

    renderToStringAsync( <Handler params={ state.params } />, function ( err, markup ) {
      if(err){
        console.log(err);
      }
      return reply.view('template', { markup: markup });
    });
  });
};

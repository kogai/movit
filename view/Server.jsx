var React = require('react');
var Router = require('react-router');
var renderToStringAsync = require('react-async').renderToStringAsync;

var Index = require('./Index');

var isAuthenticated = require('./util/Helper').isAuthenticated;

module.exports = function (request, reply) {
  'use strict';
  console.log('server');
  console.log('request.auth.isAuthenticated', request.auth.isAuthenticated);
  if (!request.auth.isAuthenticated) {
    // return reply('Authentication failed due to: ' + request.auth.error.message);
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

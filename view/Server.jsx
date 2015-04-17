var React = require('react');
var Router = require('react-router');
var renderToStringAsync = require('react-async').renderToStringAsync;

var Index = require('./Index');
var isAuthenticated = require('./util/Helper').isAuthenticated;

module.exports = function (request, reply) {
  'use strict';
  console.log('request.path ', request.path);

  Router.run(Index, '/page/id:150', function (Handler, state) {

    state.params.user = request.auth.credentials.name;
    state.params.isAuthenticated = isAuthenticated(request.auth.credentials.name);

    renderToStringAsync( <Handler params={ state.params } />, function ( err, markup ) {
      if(err){
        console.log(err);
      }
      reply(markup);
    });
  });
};

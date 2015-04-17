var React = require('react');
var Index = require('./Index');
var Router = require('react-router');
var renderToStringAsync = require('react-async').renderToStringAsync;

module.exports = function (req, reply) {
  Router.run(Index, function (Handler, state) {
    renderToStringAsync( <Handler />, function ( err, markup ) {
      if(err){
        console.log(err);
      }
      reply(markup);
    });
  });
};

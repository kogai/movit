var React = require('react');
var Index = require('./Index');
var Router = require('react-router');
var renderToStringAsync = require('react-async').renderToStringAsync;

module.exports = function (req, res) {
  Router.run(Index, function (Handler, state) {
    var params = state.params;
    params.userId = userId;
    renderToStringAsync(<Handler params={ params } />, function (err, markup) {
      res.render('index', { bundle: markup })
    });
  });
};

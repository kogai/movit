var React = require('react');
var Index = require('./Index');

var Router = require('react-router');
var cookie = require('react-cookie');

var isAuthenticated = require('./util/Helper').isAuthenticated;

Router.run(Index, Router.HistoryLocation, function (Handler, state) {

  var params = state.params;
  React.render(<Handler params={ params } />, document.body);
});

var React = require('react');
var Index = require('./Index');
var Router = require('react-router');

Router.run(Index, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={ params } />, document.body);
});

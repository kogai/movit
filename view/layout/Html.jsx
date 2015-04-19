var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header = require('./Header');

var Html = React.createClass({

  render: function() {
    return (
      <div>
        <Header />
        <RouteHandler { ...this.props } />
      </div>
    );
  }
});

module.exports = Html;

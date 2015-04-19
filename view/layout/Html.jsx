var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header = require('./Header');

var Html = React.createClass({

  render: function() {
    return (
    <html>
        <head>
          <meta charSet='utf-8' />
          <link rel="stylesheet" href="/public/style.css" />
          <title>
            { this.props.title }
          </title>
        </head>
        <body>
          <Header />
          <RouteHandler { ...this.props } />
        </body>
        <script src='/public/bundle.js'></script>
      </html>
    );
  }

});

module.exports = Html;

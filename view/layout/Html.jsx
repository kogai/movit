var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Html = React.createClass({

  render: function() {
    return (
    <html>
        <head>
          <meta charSet='utf-8' />
          <title>
            { this.props.title }
          </title>
        </head>
        <body>
          <RouteHandler { ...this.props } />
        </body>
        <script src='/public/bundle.js'></script>
      </html>
    );
  }

});

module.exports = Html;

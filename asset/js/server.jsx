const React = require('react');

const Index = React.createClass({
  render: function () {
    return (
      <h1>"Hello, browser."</h1>
    );
  }
});

React.renderToString(<Index />);

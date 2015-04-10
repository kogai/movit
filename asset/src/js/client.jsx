var React = require('react');

var Index = React.createClass({
  render: function () {
    return (
      <h1>"Hello, browser."</h1>
    );
  }
});

React.render(<Index />, document.body);

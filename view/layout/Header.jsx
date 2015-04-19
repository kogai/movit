var React = require('react');
var Link = require('react-router').Link;
var mui = require('material-ui');
var Paper = mui.Paper;

var Header = React.createClass({
  render: function() {
    return (
      <Paper className='header mui-dark-theme mui-app-bar' zDepth={0} >
        <h1 className='mui-app-bar-title header__logo'>
          <a href="/" className='header__logo--href'>movit</a>
        </h1>
      </Paper>
    );
  }
});

module.exports = Header;

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
  render: function() {
    return (
      <div className='header mui-dark-theme mui-app-bar' zDepth={0} >
        <h1 className='mui-app-bar-title header__logo'>
          <a href="/" className='header__href'>movit</a>
        </h1>
        <a href="/edit/:10" className="mui-app-bar-title header__href">Edit</a>
      </div>
    );
  }
});

module.exports = Header;

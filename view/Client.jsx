var React = require('react');
var Index = require('./Index');
/*
var Index = React.createClass({
  render: function () {
    return (
      <div>
        <label htmlFor="ddd">ddd</label>
        <input type="text" />
      </div>
    );
  }
});
*/
var Router = require('react-router');
var cookie = require('react-cookie');

var isAuthenticated = require('./util/Helper').isAuthenticated;
// /*
Router.run(Index, Router.HistoryLocation, function (Handler, state) {

  state.params.user = cookie.load('user');
  state.params.isAuthenticated = isAuthenticated(state.params.user);

  var params = state.params;
  React.render(<Handler params={ params } />, document.body);
});
// */
  // React.render(<Index />, document.body);

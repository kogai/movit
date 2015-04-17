var React = require('react');
var ReactAsync = require('react-async');

var Main = React.createClass({
  mixins: [ ReactAsync.Mixin ],
  getInitialState: function () {
    return {};
  },
  getInitialStateAsync: function (callback) {
    var _self = this;
    setTimeout(function () {
      callback(null, { text: 'async is called!'});
    }, 500);
  },
  componentDidMount: function () {
    this.setState({
      textSync: this.state.text + ' and sync is called, too!'
    });
  },
  render: function() {
    return (
      <div>
        { this.state.text }
        <br />
        { this.state.textSync }
      </div>
    );
  }

});

module.exports = Main;

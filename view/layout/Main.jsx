var React = require('react');
var ReactAsync = require('react-async');
var cookie = require('react-cookie');

var Main = React.createClass({
  mixins: [ ReactAsync.Mixin ],
  getInitialState: function () {
    return {};
  },
  getInitialStateAsync: function (callback) {
    var _self = this;
    setTimeout(function () {
      // Handlerのparamsに渡る
      callback(null, { text: 'async is called!'});
    }, 500);
  },
  componentDidMount: function () {
    this.setState({
      textSync: this.state.text + ' and sync is called, too!'
    });
  },
  render: function() {
    console.log('main rendered!');
    return (
      <div>
        { this.state.text }
        <br />
        { this.state.textSync }
        <br />
        { this.props.params }
      </div>
    );
  }

});

module.exports = Main;

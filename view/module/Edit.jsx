var React = require('react');
var ReactAsync = require('react-async');

var Main = React.createClass({
  getInitialState: function () {
    return { value: 'init' };
  },
  _handleChange: function(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (
      <form>
        <input type="text" onChange={ this._handleChange } />
        <textarea name="" id="" cols="30" rows="10" onChange={ this._handleChange }></textarea>
        <button>button</button>
      </form>
    );
  }
});

module.exports = Main;

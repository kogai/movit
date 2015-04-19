var React = require('react');
var ReactAsync = require('react-async');

var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

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
      <Paper className='post'>
        <form
          className='post__ele'
        >
          <TextField
            hintText='add post title.'
            className='post__ele__title'
          />
          <TextField
            hintText='add post body.'
            multiLine={ true }
            className='post__ele__body post__ele__body--edit'
          />
          <RaisedButton
            label='save'
            className='post__ele__button'
          />
        </form>
      </Paper>
    );
  }
});

module.exports = Main;

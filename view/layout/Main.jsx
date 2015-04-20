var React = require('react');
var ReactAsync = require('react-async');
var cookie = require('react-cookie');
var request = require('superagent');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var Card = require('../module/Card');

var Main = React.createClass({
  mixins: [ ReactAsync.Mixin ],
  getInitialState: function () {
    return {};
  },
  getInitialStateAsync: function (callback) {
    var _self = this;
    setTimeout(function () {
      // Handlerのparamsに渡る
      callback(null, {
        text: 'async is called!',
        list: [
          {
            title: "#Arrow",
            body: "this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1."
          },
          {
            title: "#ハンニバル",
            body: "this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2.this is test text 2."
          },
          {
            title: "#プリティーリズム",
            body: "this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3.this is test text 3."
          }
        ]
      });
    }, 500);
  },
  componentDidMount: function () {
    this.setState({
      textSync: this.state.text + ' and sync is called, too!'
    });
  },
  render: function() {
    var Render;
    if(this.props.params.isAuthenticated || cookie.load('twitter')){
      Render = this.state.list.map(function (data, index) {
        return <Card title={ data.title } body={ data.body } key={ index } id={ index }/>
      });
    }else{
      Render = <RaisedButton
        linkButton={ true }
        href="/bell/door"
        label='Twitterでログインする'
      />
    }
    return (
      <div className='post'>
        { Render }
      </div>
    );
  }

});

module.exports = Main;

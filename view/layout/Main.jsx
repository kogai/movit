var React = require('react');
var ReactAsync = require('react-async');
var cookie = require('react-cookie');

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
  _renderCard: function () {

  },
  render: function() {
    console.log('main rendered!');
    var Posts = this.state.list.map(function (data, index) {
      return <Card title={ data.title } body={ data.body } key={ index } id={ index }/>
    });
    return (
      <div className='post'>
        { Posts }
      </div>
    );
  }

});

module.exports = Main;

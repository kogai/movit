var React = require('react');
var ReactAsync = require('react-async');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var Main = React.createClass({
  mixins: [ ReactAsync.Mixin ],
  getInitialStateAsync: function (callback) {
    var _self = this;
    setTimeout(function () {
      // Handlerのparamsに渡る
      callback(null, {
        post: {
          title: "#オーロラドリーム",
          body: "this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1.this is test text 1."
        }
      });
    }, 500);
  },
  render: function() {
    return (
      <div className="post">
        <div className='post__ele'>
          <div className="post__ele__title">{ this.state.post.title }</div>
          <div className="post__ele__body">{ this.state.post.body }</div>
          <FlatButton
            className='post__ele__button'
            linkButton={ true }
            href="/edit/:10"
            label='Edit Button'
          />
        </div>
      </div>
    );
  }

});

module.exports = Main;

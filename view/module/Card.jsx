var React = require('react');
var Link = require('react-router').Link;

var Card = React.createClass({

  render: function() {
    var link = '/page/:' + this.props.id;
    return (
      <div className='list__ele'>
        <a href={ link }>
          <div className="list__ele__title">{ this.props.title }</div>
          <div className="list__ele__body">{ this.props.body }</div>
        </a>
      </div>
    );
  }

});

module.exports = Card;

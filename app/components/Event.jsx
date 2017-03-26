const React = require('react');

const Event = React.createClass({
  componentDidMount: function () {
    var receivedID = this.props.location.state.id;
    console.log('id',receivedID);
  },
  render: function() {
    return (
      <div>
        <p>Event Component</p>
        <p>id</p>
      </div>
    )
  }
});

module.exports = Event;

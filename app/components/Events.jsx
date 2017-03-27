const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');
const moment = require('moment');

import Event from 'Event';
const store = require('./../store/configureStore').configure();

class Events extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    var {events} = this.props;
    console.log('events', events);
  }

  render() {
    return (
      <div>
        <p>Events Component</p>
        <Event/>
      </div>
    )
  }
};

export default connect(
  (state) => {
    return state;
  }
)(Events);

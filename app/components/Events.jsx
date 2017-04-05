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
  }

  render() {
    var {events} = this.props;
     var renderEvents = () => {
       if (events.data != undefined) {
         return events.data.reverse().map((event) => {
           return <Event key={event.id} events={event}/>;
         });
       }
      return <p>Loading...</p>;
     };
    return (
      <div>
        <h1 className="text-center">Upcoming Events</h1>
        {renderEvents()}
      </div>
    )
  }
};

export default connect(
  (state) => {
    return state;
  }
)(Events);

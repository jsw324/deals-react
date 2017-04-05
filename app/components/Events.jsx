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
    var {events} = this.props;
     var renderEvents = () => {
       console.log('props', this.props);
       console.log('events', events.data);
       if (events.data != undefined) {
         console.log('inside if');
         console.log('EVENTS length', events.data[0].title_tag);
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

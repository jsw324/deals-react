const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

class Event extends React.Component {
  constructor(props) {
    super (props);
  }
  render () {
    const {events} = this.props;
    console.log('events from event', events);

      var getEventItems = () => {
        if (events.isFetching == false) {
            console.log('is event fetching', events.data[0].id);

            var obj;
            for (var key in events) {
              obj = events[key];
            }
            return (
              <div>
                <p>{obj[0].id}</p>
                <p>{obj[0].title_tag}</p>
              </div>
            )
          } else {
            return (
              <div>
                <p>Loading...</p>
              </div>
            )
          }
        };
      //TODO: push obj to state and upstead to parent 'Events' component
    return (
      <tr>
        <td>event id</td>
        <td>{getEventItems()}</td>
      </tr>
    )
  }
};

export default connect(
  (state) => {
    return state;
  }
)(Event);

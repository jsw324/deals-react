const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');
const moment = require('moment');

import Events from 'events';
import Fight from 'Fight';

const store = require('./../store/configureStore').configure();

class FightList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    var fightId = this.props.params;
    var {dispatch} = this.props;
    console.log('FIGHTS', fightId.id);
    dispatch(actions.getFights(fightId.id));
  }

  render() {
    var {fights} = this.props;
    var renderFight = () => {
      if (fights.data != undefined) {
        return fights.data.map((fight) => {
          return <Fight key={fight.id} fights={fight}/>;
        });
      }
      return <p>Loading...</p>
    }

    return (
      <div>
        <h1 className="center-align">Fight</h1>
        {renderFight()}
      </div>
    )
  }
};

export default connect(
  (state) => {
    return state;
  }
)(FightList);

const React = require('react');
import ReactDOM from 'react-dom';
const {connect} = require('react-redux');
const actions = require('actions');
const moment = require('moment');

var Fight = React.createClass({
  render: function () {
    var {id, fighter1_first_name, fighter1_last_name, fighter2_first_name, fighter2_last_name, fighter1_full_body_image,fighter2_full_body_image, fighter1_weight_class} = this.props.fights;
    console.log('event props', fighter1_last_name);
    var renderFights = () => {
      if (id) {
        return (
        <div>
          <div className="col s6 l6 m6">
            <div className="center-align">
              <div className="card-divider">
                <h4 className="text-center">{fighter1_first_name} {fighter1_last_name} vs. {fighter2_first_name} {fighter2_last_name}</h4>
                <p className="text-center">{fighter1_weight_class}</p>
              </div>
                <div className="align-center">
                  <img className="left float-left" src={fighter1_full_body_image}/><img className="right float-right" src={fighter2_full_body_image}/>
                </div>
              </div>
            </div>
          </div>

        )
      } else {
        return <p>Error Loading information.</p>
      }
    };
    return (
      <div>
        {renderFights()}
      </div>
    )
  }
});

export default connect()(Fight);

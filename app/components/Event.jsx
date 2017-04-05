const React = require('react');
import ReactDOM from 'react-dom';
const {connect} = require('react-redux');
const actions = require('actions');
const moment = require('moment');
import { Link } from 'react-router';

var Event = React.createClass({
  render: function () {
    var {dispatch} = this.props;
    var {id, title, title_tag, date, img} = this.props.events;
    console.log('event props', id);
    var renderOne = () => {
      if (id) {
        return (

          <div className="column small-centered medium-6 large-6">
            <div className="card align-center" style={{width: 500}}>
              <div className="card-divider">
                <h4 className="text-center">{title_tag}</h4>
                <p className="text-center">{title}</p>
                <p>{moment.utc(date).format('dddd, MMMM Do YYYY')}</p>
              </div>
              <Link to={`/FightList/${id}`}><img className="align-center" src={img} style={{width: 500}}/></Link>
              <div className="card-section">
                <p>{moment.utc(date).format('dddd, MMMM Do YYYY')}</p>
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
        {renderOne()}
      </div>
    )
  }
});

export default connect()(Event);

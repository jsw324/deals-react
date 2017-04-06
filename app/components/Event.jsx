const React = require('react');
import ReactDOM from 'react-dom';
const {connect} = require('react-redux');
const actions = require('actions');
const moment = require('moment');
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Event extends React.Component{
  constructor (props) {
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick() {

      console.log('click', this.props.events.id);
      window.location.href = `/#/FightList/${this.props.events.id}`
  }

  render () {
    var {dispatch} = this.props;
    var {id, title, title_tag, date, img} = this.props.events;
    console.log('event props', id);

    var renderOne = () => {
      if (id) {
        return (
          <div>
            <MuiThemeProvider>
              <Card>
                <CardHeader
                  title={title}
                  subtitle={title_tag}
                />
                <CardMedia
                  overlay={<CardTitle className="center-align" title={title_tag} subtitle={moment.utc(date).format('dddd, MMMM Do YYYY')} />}
                  >
                  <img src={img} alt="Event Poster"/>
                  </CardMedia>
                <button onClick={this.handleImageClick}>Click Me</button>
              </Card>
            </MuiThemeProvider>
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
};

export default connect()(Event);

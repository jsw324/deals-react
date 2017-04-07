const React = require('react');
import ReactDOM from 'react-dom';
const {connect} = require('react-redux');
const actions = require('actions');
const moment = require('moment');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';


var Fight = React.createClass({
  render: function () {
    var {
        id,
        fighter1_first_name, 
        fighter1_last_name,
        fighter2_first_name,
        fighter2_last_name,
        fighter1_full_body_image,
        fighter2_full_body_image,
        fighter1_weight_class,
        fighter1record,
        fighter2record,
        fighter1height,
        fighter2height,
        fighter1weight,
        fighter2weight
      } = this.props.fights;
    console.log('event props', fighter1_last_name);
    var renderFights = () => {
     const style = {
       height: 'auto',
       width: '95%',
       marginTop: 20,
       marginLeft: 20,
       marginRight: 20,
       textAlign: 'center',
       display: 'inline-block'
     }
      if (id) {
        return (
        <div>
          <MuiThemeProvider>
            <Paper style={style} zDepth={2}>
              <h4 className="center-align">{fighter1_first_name} {fighter1_last_name} vs. {fighter2_first_name} {fighter2_last_name}</h4>
               <img style={{float: 'left', verticalAlign:'text-top'}} src={fighter1_full_body_image} /> <img style={{float:'right'}} src={fighter2_full_body_image}/>
              <p className="center-align flow-text">{fighter1_weight_class}<br/><br/>
              <label className="center-align">Record</label><br/>
              {fighter1record} |  {fighter2record}<br/><br/>
              <label className="center-align">Height</label><br/>
              {fighter1height}" |  {fighter2height}"<br/><br/>
              <label className="center-align">Weight</label><br/>
              {fighter1weight}  |  {fighter2weight}
             </p>
            </Paper>  
          </MuiThemeProvider>
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

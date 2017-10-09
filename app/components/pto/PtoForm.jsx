import React from 'react';
import { connect } from 'react-redux';
import subtractPtoDays from '../../actions/subtractPtoDays';

class PtoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
		//add materializeCSS jquery functionality to datepicker and dropdown 
			$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
  };

  handleClick() {
    const { dispatch } = this.props;
    console.log('click refs', this.refs.startDate.value);
    console.log('another ref', this.refs.totalDays.value);
    console.log('pto description:', this.refs.details.value);
    const { totalDays, startDate, details } = this.refs;
    dispatch(subtractPtoDays(totalDays.value, startDate.value, details.value));
  }
  
  render() {
    const { name } = this.props;
    console.log('this.state', this.state);
    return (
      <div className="container pto__form">
        <div className="row">
          <div className="col s6 offset-s2">
            <h4 className="text-cent">{ name }</h4>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="numberOfDaysOff" type="text" ref="totalDays" />
            <label className="center-text">How many total days?</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="startDate" ref="startDate" type="date" className="datepicker" />
            <label className="text-center">What's the date of the first day?</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="details" ref="details" type="text" />
            <label className="text-center">Would you like to share where you're going?</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <button onClick={this.handleClick} className="btn">Submit</button>
            <span>  </span>
            <button className="btn red">Cancel</button>
            <br />
            <p className="input__error"></p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(PtoForm);

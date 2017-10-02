import React from 'react';

class PtoForm extends React.Component {

  componentDidMount() {
		//add materializeCSS jquery functionality to datepicker and dropdown 
			$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
		$('select').material_select();
  };
  
  render() {
    const { name, profilePhoto } = this.props;
    console.log('this.state', this.state);
    return (
      <div className="container">
        <div className="row">
          <div className="col s4 offset-s2">
            <img src={ profilePhoto } />
          </div>
          <div className="col s4 offset-s2">
            <h4 className="text-cent">{ name }</h4>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s4 offset-s2">
            <input id="numberOfDaysOff" ref="numberOfDaysOff" type="text" className="validate"/>
            <label>How many days?</label>
          </div>
          <div className="input-field col s4 offset-s2">
            <input id="startDate" ref="startDate" type="date" className="datepicker" placeholder="First day off"/>
          </div>
        </div>
        <div classNae="row">
          <div className="input-field col s4 offset-s2">
            <button className="btn">Submit</button>
            <button className="btn red">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PtoForm;

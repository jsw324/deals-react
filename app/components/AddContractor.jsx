import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const actions = require('actions');
const moment = require('moment');

class AddDeal extends React.Component {
  	constructor (props) {
  	super(props);
		this.submitDeal = this.submitDeal.bind(this);
	}
	
	componentDidMount() {
			$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
		$('select').material_select();
	}

	submitDeal(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		var { name, email, client, billRate, hourly, startDate, recruiter, sales } = this.refs;
		console.log('name', name);
	if (name.value == '' || email.value == '' || client.value == '' || billRate.value <= 0 || hourly.value <= 0 || startDate.value <= 0 || recruiter.value == '' || sales == '') {
		console.log('error');
		document.getElementById('error').innerHTML = 'Error in field, please check your values and try again.';
	} else {
		var day = moment(startDate.value, "YYYY-MM-DD").unix();
		console.log("DAY", startDate.value);
			var data = {
				name: name.value,
				email: email.value,
				client: client.value,
				billRate: billRate.value,
				hourly: hourly.value,
				startDate: day,
				recruiter: recruiter.value,
				sales: sales.value
			};
			dispatch(actions.postContract(data));
		}
	};
	render () {
		const style = {
			height: 'auto',
			width: '95%',
			margin: 20,
			textAlign: 'center',
  			display: 'inline-block',
		}
		return (
			<div>

		<div className="row">
			<div className="col s10 offset-s1 add__contractor">
					<h3 className="center-align">Contract  Details</h3>
						<form onSubmit={this.submitDeal}>
							<div className="row">
								<div className="input-field col s4 offset-s2">
									<input id="name" ref="name" type="text" className="validate"/>
									<label for="name">Name</label>
								</div>

								<div className="input-field col s4 offest-s2">
									<select id="isW2" ref="isW2">
										<option value="" disabled selected>Employment Type</option>
										<option value="w2">W2</option>
										<option value="1099">1099</option>
									</select>
								</div>
      				</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<input id="recruiter" ref="recruiter" type="text" className="validate"/>
									<label for="recruiter">Recruiter</label>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="sales" ref="sales" type="text" className="validate"/>
									<label for="sales">Sales</label>
								</div>
      				</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<input id="hourly" ref="hourly" type="text" className="validate"/>
									<label for="hourly">Pay Rate</label>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="billRate" ref="billRate" type="text" className="validate"/>
									<label for="bill-rate">Bill Rate</label>
								</div>
      				</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<input id="startDate" ref="startDate" type="date" className="datepicker" placeholder="Start date"/>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="client" ref="client" type="text" className="validate"/>
									<label for="client">Client</label>
								</div>
      				</div>
							<div className="row">
								<div className="col s4 offset-s2">
									<div id="error" style={{color:'red'}}></div>
									<br/>
									<button className="btn">Submit</button>
								</div>
							</div>
						</form>
					</div>
					</div>
			</div>
		)
	}
};

export default connect()(AddDeal);

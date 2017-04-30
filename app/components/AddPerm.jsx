import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const actions = require('actions');
const moment = require('moment');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AddContractor from 'AddContractor';

//const $ = require('jquery');

class AddPerm extends React.Component {
  	constructor (props) {
  	super(props);
		console.log('store', this.props);
		this.submitDeal = this.submitDeal.bind(this);
		this.state = { showModal: true };
		this.renderPermSheet = this.renderPermSheet.bind(this);
	};

	submitDeal(e) {
		e.preventDefault();
		var { dispatch } = this.props;
		var { name, client, salary, fee, startDate, recruiter, sales } = this.refs;
		console.log('refs', this.refs);
		console.log('start date', startDate.value);
		if (name.value == '' || client.value == '' || salary.value < 0 || fee.value < 0 || recruiter.value == '' || sales.value == '') {
			console.log('error');
			document.getElementById('errorLabel').innerHTML = 'Error';
		} else {
			console.log("FEE TYPE", typeof fee.value);
			var day = moment(startDate.value, "DD MMM, YYYY").unix();
			console.log("DAY", startDate.value);
			var data = {
				name: name.value,
				client: client.value,
				salary: parseInt(salary.value),
				fee: parseInt(fee.value),
				startDate: day,
				recruiter: recruiter.value,
				sales: sales.value
			};
		
			dispatch(actions.postPerm(data));
			dispatch(actions.toggleModal());
			this.refs.name.value = '';
			this.refs.client.value = '';
			this.refs.salary.value = '';
			this.refs.fee.value = '';
			this.refs.startDate.value = '';
			this.refs.recruiter.value = '';
			this.refs.sales.value = '';
		}
	}

	componentDidMount() {
			$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
	}
		renderPermSheet() {
				return (
					<div>
						
						<h3 className="center-align">Full-Time Placement Details</h3>
							<form onSubmit={this.submitDeal}>
								<div className="row">
									<div className="input-field col s6 offset-s3">
										<input id="name" ref="name" type="text" className="validate"/>
										<label for="name">Name</label>
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
										<input id="salary" ref="salary" type="text" className="validate"/>
										<label for="salary">Salary</label>
									</div>

									<div className="input-field col s4 offest-s2">
										<input id="fee" ref="fee" type="text" className="validate"/>
										<label for="fee">Fee</label>
									</div>
								</div>

								<div className="row">
									<div className="input-field col s4 offset-s2">
										<input id="startDate" ref="startDate" type="date" className="datepicker" placeholder="Start Date"/>
										
									</div>

									<div className="input-field col s4">
										<input id="client" ref="client" type="text" className="#"/>
										<label for="client">Client</label>
									</div>
								</div>
								<div className="row">
									<div className="col s4 offset-s2">
										<label id='errorLabel' className="center-align"></label>
										<button className="btn">Submit</button>
									</div>
								</div>
							</form>
						</div>
					)	
			
			};

	render () {
		return (
			<div>
				{this.renderPermSheet()}
			</div>
		)
	}
}

export default connect()(AddPerm);

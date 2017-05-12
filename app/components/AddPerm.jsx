import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');
const moment = require('moment');

import AddContractor from 'AddContractor';
import SelectRecruiter from 'SelectRecruiter';


class AddPerm extends React.Component {
  	constructor (props) {
  	super(props);
		this.submitDeal = this.submitDeal.bind(this);
		this.renderPermSheet = this.renderPermSheet.bind(this);
		this.renderSelectRecruiters = this.renderSelectRecruiters.bind(this);
	};

	submitDeal(e) {
		e.preventDefault();
		var { dispatch } = this.props;
		var { name, client, salary, fee, startDate, recruiter, sales } = this.refs;
		//check if values are empty and if not, mutate unix date value to formatted string and push to array.
		if (name.value == '' || client.value == '' || salary.value < 0 || fee.value < 0 || recruiter.value == '' || sales.value == '') {
			document.getElementById('errorLabel').innerHTML = 'Error in field, please check your values and try again.';
		} else {
			var day = moment(startDate.value, "DD MMM, YYYY").unix();
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
			dispatch(actions.togglePermModal());
		}
	}

	//TODO: get all recruiters and display dropdown of available employees
	renderSelectRecruiters() {
		var { recruiters } = this.props;
		if (recruiters.length > 0) {
			return (
				<option>Hello, world</option>
			)
		} else {
			return (
				<div>
					<p>Loading</p>
				</div>
			)
		}
	}

	componentDidMount() {
			//jquery for MaterializeCSS select and date picker
			$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
			$('select').material_select();
	}
		renderPermSheet() {
			var { dispatch, recruiters } = this.props;
			//render only after recruiter object is retrieved from firebase
			if (recruiters.length > 0) {
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
										<p className="range-field">
      								<input type="range" id="fee" ref="fee" min="10" max="25" />
    								</p>
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
										<label id='errorLabel' className="center-align" style={{color:'red'}}></label>
										<button className="btn blue">Submit</button>
									</div>
									<div className="col s4">
										<button className="btn red" onClick={() => dispatch(actions.togglePermModal())}>Cancel</button>
									</div>
								</div>
							</form>
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

	render () {
		return (
			<div>
				{this.renderPermSheet()}
			</div>
		)
	}
}

export default connect()(AddPerm);

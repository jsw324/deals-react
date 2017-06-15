import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');
const moment = require('moment');


class AddPerm extends React.Component {
  	constructor (props) {
  	super(props);
		this.submitDeal = this.submitDeal.bind(this);
		this.renderSelectRecruiters = this.renderSelectRecruiters.bind(this);
	};

	submitDeal(e) {
		e.preventDefault();
		var { dispatch } = this.props;
		var { name, client, salary, fee, startDate, recruiter, sales, title, source } = this.refs;
		//check if values are empty and if not, mutate unix date value to formatted string and push to array.
		if (name.value == '' || client.value == '' || salary.value < 0 || fee.value < 0 || recruiter.value == '' || sales.value == '' || title.value == '' || source.value == '') {
			console.log('refs', this.refs);
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
				sales: sales.value,
				title: title.value,
				source: source.value
			};
		
			dispatch(actions.postPerm(data));
			dispatch(actions.togglePermModal());
		}
	}

	//TODO: get all recruiters and display dropdown of available employees
	renderSelectRecruiters(value) {
		var { recruiters } = this.props;
		if (recruiters.length > 0) {
			var items = recruiters.map((recruiter) => {
				return (
					<option key={recruiter.id} value={recruiter.id}>{recruiter.name}</option>
				)
			});
			return 	<select id={value} ref={value} defaultValue="Employee Name">{items}</select>
		} else {
			return (
				<div>
					<p>Loading</p>
				</div>
			)
		}
	};

	componentDidMount() {
		//add materializeCSS jquery functionality to datepicker and dropdown 
			$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
		$('select').material_select();
	};

	render() {
			var { dispatch, recruiters } = this.props;
			//render only after recruiter object is retrieved from firebase
			if (recruiters.length > 0) {
				return (
					<div>
						<h3 className="center-align">Full-Time Placement Details</h3>
							<form onSubmit={this.submitDeal}>
								<div className="row">
									<div className="input-field col s4 offset-s2">
										<input id="name" ref="name" type="text" className="validate"/>
										<label>Name</label>
									</div>
									<div className="input-field col s4">
										<input id="title" ref="title" type="text"/>
										<label>Job Title</label>
									</div>
								</div>

								<div className="row">
									<div className="input-field col s4 offset-s2">
											{this.renderSelectRecruiters('recruiter')}
											<label>Recruiter</label>
									</div>
									<div className="input-field col s4 offest-s2">
										{this.renderSelectRecruiters('sales')}
										<label>Sales</label>
									</div>
								</div>

								<div className="row">
									<div className="input-field col s4 offset-s2">
										<input id="salary" ref="salary" type="text" className="validate"/>
										<label>Salary</label>
									</div>

									<div className="input-field col s4 offest-s2">
										<select id="fee" ref="fee">
											<option disabled default>Select Fee</option>
											<option value="20">20%</option>
											<option value="18">18%</option>
											<option value="15">15%</option>
										</select>
										<label>Fee</label>
									</div>
								</div>

								<div className="row">
									<div className="input-field col s4 offset-s2">
										<input id="startDate" ref="startDate" type="date" className="datepicker" placeholder="Start Date"/>			
									</div>

									<div className="input-field col s4">
										<input id="client" ref="client" type="text" className="#"/>
										<label>Client</label>
									</div>
								</div>
								<div className="row">
									<div className="input-field col s6 offset-s3">
										<select id="source" ref="source">
											<option disabled default>Source</option>
											<option>Monster Search</option>
											<option>Monster Posting</option>
											<option>Dice Search</option>
											<option>Dice Posting</option>
											<option>LinkedIn Posting</option>
											<option>LinkedIn INmail</option>
											<option>Clearance Jobs</option>
											<option>Referral</option>
											<option>Pass-through</option>
											<option>Other</option>
										</select>
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
				} 
		};
}

var mapStateToProps = (state) => {
	return { recruiters: state.recruiters };
}

export default connect(mapStateToProps)(AddPerm);

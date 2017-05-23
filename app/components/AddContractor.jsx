import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');
const moment = require('moment');

class AddDeal extends React.Component {
  	constructor (props) {
  	super(props);
		//bind submitDeal method to this keyword
		this.submitDeal = this.submitDeal.bind(this);
		this.renderSelectRecruiters = this.renderSelectRecruiters.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			hourly: null,
			billRate: null
		}
	}

	renderSelectRecruiters(value) {
		console.log('PROPS', this.props);
		var { recruiters } = this.props;
		if (recruiters.length > 0) {
			var items = recruiters.map((recruiter) => {
				return (
					<option value={recruiter.id}>{recruiter.name}</option>
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
	}

	//display spread in real-time as bill and payrate are entered.
	handleChange(event) {
		const target = event.target;
		var value;
		const name = target.id;
		console.log('name', name);
		console.log('target value', target.value);
		if (target.id === 'billRate') {
			value = target.value;
		} else {
			value = target.value;
		}
		console.log('value', value);
		this.setState({
			[name]:value
		});
	}

	componentDidUpdate() {
		console.log('state', this.state);
		var spreads = (this.state.billRate - this.state.hourly) * 40;
		document.getElementById('spreadAmount').innerHTML = 'SPREAD: ' +  '$' + spreads;
	}

	submitDeal(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		var { name, isW2, client, billRate, hourly, startDate, recruiter, sales, source, state } = this.refs;
		console.log('name', name.value);
	if (name.value == '' || isW2.value == '' || client.value == '' || billRate.value <= 0 || hourly.value <= 0 || startDate.value <= 0 || recruiter.value == '' || sales == '' || source == '' || state == '') {
		//check for any blank values, if so throw error.
		console.log('error');
		document.getElementById('error').innerHTML = 'Error in field, please check your values and try again.';
	} else {
		//TODO: change this to .map function
		//format unix date to formatted date string and push data to new array.  This is done to 
		//prevent mutation of redux objects for us with other components. 
		var day = moment(startDate.value, "DD MMM, YYYY").unix();
		console.log("DAY", startDate.value);
			var data = {
				name: name.value,
				isW2: isW2.value,
				client: client.value,
				billRate: billRate.value,
				hourly: hourly.value,
				startDate: day,
				recruiter: recruiter.value,
				sales: sales.value,
				completedDate: "",
				source: source.value,
				state: state.value
			};
			dispatch(actions.postContract(data));
			dispatch(actions.toggleContractModal());
		}
	};
	render () {
		var { dispatch, recruiters } = this.props;
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
									<select id="isW2" ref="isW2" defaultValue="Employment Type">
										<option value="" disabled>Employment Type</option>
										<option value="w2">W2</option>
										<option value="1099">1099</option>
									</select>
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
									<input id="hourly" ref="hourly" type="text" className="validate" onChange={this.handleChange}/>
									<label for="hourly">Pay Rate</label>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="billRate" ref="billRate" type="text" className="validate" onChange={this.handleChange}/>
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
								<div className="input-field col s4 offset-s2">
									<select id="source" ref="source">
											<option disabled defaultView>Source</option>
											<option>Monster Search</option>
											<option>Monster Posting</option>
											<option>Dice Search</option>
											<option>Dice Posting</option>
											<option>LinkedIn Posting</option>
											<option>LinkedIn INmail</option>
											<option>Referral</option>
											<option>Pass-through</option>
											<option>Other</option>
										</select>
										<label>Source</label>
								</div>
								<div className="input-field col s4">
									<input id="state" ref="state" type="text"/>
									<label>State</label>
								</div>
							</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<label id="spreadAmount">SPREAD: </label>
								</div>
							</div>

							<div className="row">
								<div className="col s4 offset-s2">
									<div id="error" style={{color:'red'}}></div>
									<br/>
									<button className="btn blue">Submit</button>
								</div>
								<div className="col s4">
									<br/>
									<button onClick={() => dispatch(actions.toggleContractModal())} className="btn red">Cancel</button>
								</div>
							</div>
						</form>
					</div>
					</div>
			</div>
		)
	}
};

export default connect(
	(state) => {
		return state;
	}
)(AddDeal);

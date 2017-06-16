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
		console.log(typeof recruiters);
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
		} else if (target.id === 'hourly') {
			value = target.value;
		} else {
			value = target.value;
		}
		console.log('value', value);
		this.setState({
			[name]:value
		});
	}
//TODO: calculate w/ 1099 vs w2
	componentDidUpdate() {
		var { billRate, hourly, isW2 } = this.refs;
		console.log('BR', billRate.value);
		console.log('STTE', this.state.billRate);
		console.log('W2', isW2.value);
		if (isW2 === true) { 
			
		}
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
			Materialize.toast('Contractor Successfully Added!', 4000);
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
									<label>Name</label>
								</div>

								<div className="input-field col s4 offest-s2">
									<select id="isW2" ref="isW2" defaultValue="Employment Type">
										<option value="" disabled>Employment Type</option>
										<option value="w2" onChange={this.handleChange}>W2</option>
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
									<label>Pay Rate</label>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="billRate" ref="billRate" type="text" className="validate" onChange={this.handleChange}/>
									<label>Bill Rate</label>
								</div>
      				</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<input id="startDate" ref="startDate" type="date" className="datepicker" placeholder="Start date"/>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="client" ref="client" type="text" className="validate"/>
									<label>Client</label>
								</div>
      				</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<select selected="source" id="source" ref="source">
											<option value="" disabled default>Source</option>
											<option value="Monster search">Monster Search</option>
											<option value="Monster posting">Monster Posting</option>
											<option value="Dice search">Dice Search</option>
											<option value="Dice posting">Dice Posting</option>
											<option value="LinkedIn Posting">LinkedIn Posting</option>
											<option value="LinkedIn InMail">LinkedIn INmail</option>
											<option value="referral">Referral</option>
											<option value="pass-thru">Pass-through</option>
											<option value="other">Other</option>
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

function mapStateToProps(state){
	return { recruiters: state.recruiters } ;
}

export default connect(mapStateToProps)(AddDeal);

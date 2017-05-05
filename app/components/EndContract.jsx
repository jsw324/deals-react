import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const actions = require('actions');
const moment = require('moment');

class EndContract extends React.Component {
  	constructor (props) {
  	super(props);
		this.endContract = this.endContract.bind(this);
	}
	
	componentDidMount() {
			$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15 // Creates a dropdown of 15 years to control year
		});
		$('select').material_select();
	}

	endContract(endDate) {
		var { contractor, dispatch } = this.props;
		var { endDate } = this.refs;
		var endedDay = moment(endDate.value, "DD MMM, YYYY").unix();
		var day = moment.unix(endedDay).format('MM/DD/YYYY');
		contractor.completedDate = day;
		console.log('ENDED', contractor);
		console.log('END DATE', endDate.value);
		dispatch(actions.endContract(contractor));
	}

	render () {
		var { contractor } = this.props;
		return (
			<div>

		<div className="row">
			<div className="col s10 offset-s1 add__contractor">
					<h5 className="center-align">End Contract for {contractor.name}</h5>
						<form onSubmit={this.endContract}>
							<div className="row">
								<div className="input-field col s4 offset-s2">
									<p>{contractor.name}</p>
									<small>Name</small>
								</div>

								<div className="input-field col s4 offest-s2">
									<p>{contractor.isW2}</p>
									<small>W2 or 1099</small>
								</div>
      				</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<p>{contractor.recruiter}</p>
									<small for="recruiter">Recruiter</small>
								</div>

								<div className="input-field col s4 offest-s2">
									<p>{contractor.sales}</p>
									<small>Sales</small>
								</div>
      				</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<p>{contractor.hourly}</p>
									<small>Pay Rate</small>
								</div>

								<div className="input-field col s4 offest-s2">
									<p>{contractor.billRate}</p>
									<small>Bill Rate</small>
								</div>
      				</div>

							<div className="row">
								<div className="input-field col s4 offset-s2">
									<p>{contractor.startDate}</p>
									<small>Start Date</small>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="endDate" ref="endDate" type="date" className="datepicker" placeholder="END DATE"/>
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

export default connect()(EndContract);

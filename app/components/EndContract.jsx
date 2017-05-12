import React from 'react';
import { connect } from 'react-redux';
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
		//pull contractor and end date off of props and refs, respectively.
		var { contractor, dispatch } = this.props;
		var { endDate } = this.refs;
		//change date to usable format
		var endedDay = moment(endDate.value, "DD MMM, YYYY").unix();
		var day = moment.unix(endedDay).format('MM/DD/YYYY');
		//push formatted enddate to object
		contractor.completedDate = day;
		//close modal and send off action 
		this.setState({ showEndContractModal: false }); //TODO: move this to redux action generator
		dispatch(actions.endContract(contractor));
	}

	render () {
		var { contractor } = this.props;
		return (
			<div>

		<div className="row">
			<div className="col s10 offset-s1 add__contractor">
					<h5 className="center-align">End Contract for {contractor.name}</h5>
					<p className="center-align">Please enter end date</p>
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
								<div className="col s4">
									<br/>
									<button className="btn red" onClick={() => this.setState({ showEndContractModal: false})}>Cancel</button>
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

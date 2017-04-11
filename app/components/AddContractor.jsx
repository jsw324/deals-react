import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
const actions = require('actions');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

class AddDeal extends React.Component {
  	constructor (props) {
  	super(props);
		this.submitDeal = this.submitDeal.bind(this);
	};
	submitDeal(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		var { name, email, client, billRate, hourly, startDate, recruiter, sales } = this.refs;
		console.log('name', name);
	if (name.value == '' || email.value == '' || client.value == '' || billRate.value <= 0 || hourly.value <= 0 || startDate.value <= 0 || recruiter.value == '' || sales == '') {
		console.log('error');
		document.getElementById('error').innerHTML = 'Error in field, please check your values and try again.';
	} else {
			var data = {
				name: name.value,
				email: email.value,
				client: client.value,
				billRate: billRate.value,
				hourly: hourly.value,
				startDate: parseInt(startDate.value),
				recruiter: recruiter.value,
				sales: sales.value
			};
			dispatch(actions.postContract(data));
			console.log('data', data);
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
			<MuiThemeProvider>
				<Paper style={style} z-depth={3}>

					<ul className="tabs">
						<li className="tab col s3"><Link className="active" to="/new-contractor">Contract</Link></li>
						<li className="tab col s3"><Link to="/new-perm">Perm</Link></li>
					</ul>

					<h3 className="center-align">Contract  Details</h3>
						<form onSubmit={this.submitDeal}>
							<div className="row">
								<div className="input-field col s4 offset-s2">
									<input id="name" ref="name" type="text" className="validate"/>
									<label for="name">Name</label>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="email" ref="email" type="email" className="validate"/>
									<label for="email">Email</label>
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
									<input id="startDate" ref="startDate" type="date" className="validate"/>
									<label for="startDate">Start Date</label>
								</div>

								<div className="input-field col s4 offest-s2">
									<input id="client" ref="client" type="text" className="validate"/>
									<label for="client">Client</label>
								</div>
      				</div>
							<div id="error" style={{color:'red'}}></div>
							<br/>
							<button className="btn">Submit</button>
						</form>
					</Paper>
			</MuiThemeProvider>
			</div>
		)
	}
};

export default connect()(AddDeal);

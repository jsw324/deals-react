import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import Paper from 'material-ui/Paper';


class Login extends React.Component {
	constructor (props) {
		super(props);
		console.log('props from constructor', props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onLogout = this.onLogout.bind(this);
	}
	handleSubmit(e) {
		var {dispatch} = this.props;
		dispatch(actions.startLogin());
	}
	onLogout(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.startLogout());
	}
	render () {
		return (
			<div>
			
				
				<div className="row">
				<h1 className="center-align">Login</h1>
					<div className="col s10 offset-s2 m6 offset-m4 l4 offset-l4 ">
						<p>Login with Google account below.</p>
						<button className="btn" onClick={this.handleSubmit}>Login with Google</button>
						<br/>
						<button className="btn" onClick={this.onLogout}>Logout</button>
					</div>
				</div>
			</div>
		)
	}
};

export default connect()(Login);
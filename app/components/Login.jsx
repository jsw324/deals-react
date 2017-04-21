import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import Nav from 'Nav';

class Login extends React.Component {
	constructor (props) {
		super(props);
		console.log('props from constructor', props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		var {dispatch} = this.props;
		dispatch(actions.startLogin());
	}

	render () {
		return (
			<div>
				<Nav/>
				<div className="row">
					<img className="login__hero__image" src="/bridge.jpg"/>
					<div className="login__form">
						<h4 className="center-align">Welcome, please sign in.</h4>
						<a onClick={this.handleSubmit}><img className="login__image" src="google-login.png"/></a>
						
					</div>
				</div>
			</div>
		)
	}
};

export default connect()(Login);
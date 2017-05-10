import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');


class Login extends React.Component {
	constructor (props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	handleSubmit(e) {
		var {dispatch} = this.props;
		dispatch(actions.startLogin());
	}

	submitForm(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		var { email, password } = this.refs;
		dispatch(actions.startLoginWithEmailAndPassword(email.value, password.value));
	};

	render () {
		return (
			<div>
				<div className="row">
					<img className="login__hero__image" src="/bridge.jpg"/>
					<div className="login__form">
						<h4 className="center-align">Welcome, please sign in.</h4>
						
						<div className="input-field container">	
							<form onSubmit={this.submitForm}>
								<input className="login__input" id="email" type="text" ref="email" placeholder="username/email" />
								<input className="login__input" id="email" type="password" ref="password" placeholder="password" />
								<button className="btn">Submit</button>
							</form>
						</div>
						<a onClick={this.handleSubmit}><img className="login__image" src="google-login.png"/></a>
					</div>
				</div>
			</div>
		)
	}
};

export default connect()(Login);
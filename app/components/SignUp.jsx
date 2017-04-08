import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import Paper from 'material-ui/Paper';


class SignUp extends React.Component {
	constructor (props) {
		super(props);
		console.log('props from constructor', props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		var {dispatch} = this.props;
		e.preventDefault();
		console.log('e', e);
		console.log('props', this.refs.email);
		console.log('refs pw', this.refs.password.value);
		dispatch(actions.postSignUp(this.refs.email.value, this.refs.password.value));
	}
	render () {
		return (
			
  <div className="row">
		<h1 className="center-align">Sign Up</h1>
		<form onSubmit={this.handleSubmit} className="col s12">
      <div className="row">
        <div className="input-field inline col s8 offset-s2">
          <input id="email" ref="email" type="text" className="validate" />
          <label for="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field inline col s8 offset-s2">
          <input id="password" ref="password" type="password" className="validate"/>
          <label for="password">Password</label>
        </div>
      </div>
			<div className="row">
				<div className="col s8 offset-s2">
					<button className="btn">Submit</button>
				</div>
			</div>
    	</form>
 	 </div>
        

		)
	}
};

export default connect()(SignUp);
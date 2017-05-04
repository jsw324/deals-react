import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

class AddRecruiters extends React.Component { 
  constructor (props) {
    super(props);
    this.submitRecruiter = this.submitRecruiter.bind(this);
  }

  componentDidMount () {
    	$('select').material_select();
  }

  submitRecruiter (e) {
    e.preventDefault();
    var { dispatch } = this.props;
    var { name, email, isRecruiter } = this.refs;
    if ( name.value == '' || email.value == '' || isRecruiter.value == '' ) {
      console.log('error');
      document.getElementById('error').innerHTML = 'Error in field, please check your values';
    } else {
      var data = {
        name: name.value,
        email: email.value,
        isRecruiter: isRecruiter.value
      };
      dispatch(actions.postRecruiter(data));
    }
  }

  render () {
    return (
      <div>
        <h3 className="center-align">Add Recruiter</h3>
        <div className="row">
          <div className="col s10 offset-s1">
            <form onSubmit={this.submitRecruiter}>
              <div className="row">
                <div className="input-field col s4 offset-s4">
                  <input id="name" ref="name" type="text"/>
                  <label for="name">Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s4 offset-s4">
                  <input id="email" ref="email" type="text"/>
                  <label for="email">Email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s4 offset-s4">
                  <select id="isRecruiter" ref="isRecruiter">
                    <option value="" disabled>Recrutier or Sales?</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col s4 offset-s4">
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

export default connect()(AddRecruiters);
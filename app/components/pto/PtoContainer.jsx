import React from 'react';
import { connect } from 'react-redux';
import subtractPtoDays from '../../actions/subtractPtoDays';

class PtoContainer extends React.Component {
  render () {
    const { profilePhoto, email, recruiter } = this.props;
    console.log('recruiter', recruiter);
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 text-center">
            <img className="responsive" src={ profilePhoto } />
            <h5 className="text-center">{ email }</h5>
            <h5 className="text-center">Days Left: <b>{ recruiter.daysLeft }</b></h5>  
            <button onClick={ () => subtractPtoDays(recruiter, 1) } className="btn">Record PTO</button>        
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    profilePhoto: state.auth.photo,
    email: state.auth.email,
    recruiter: state.recruiters.find(rcrtr => rcrtr.email === state.auth.email),
  })
)(PtoContainer);

import React from 'react';
import { connect } from 'react-redux';
import subtractPtoDays from '../../actions/subtractPtoDays';

import PtoForm from './PtoForm';

class PtoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ptoModalOpen: false }
    this.handlePtoModal = this.handlePtoModal.bind(this);
  }

  handlePtoModal () {
    console.log('here);')
    this.setState({ ptoModalOpen: !this.state.ptoModalOpen });
  }

  render () {
    const { profilePhoto, email, recruiter } = this.props;
    console.log('recruiter', recruiter);
    return (
      <div className="row pto__formatting">
        <h2 className="center-align">Vacation Tracker</h2>
        <div className="col s6 m6 l6 text-center">
          <img className="responsive" src={ profilePhoto } />
          <h5 className="text-center">{ email }</h5>
          <h5 className="text-center">Days Left: <b>{ recruiter.daysLeft }</b></h5>
        </div>
        <div className="col s6 m6 l6 text-center">
          <PtoForm recruiter={ recruiter } profilePhoto={ profilePhoto } />
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

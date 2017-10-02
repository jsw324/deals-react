import React from 'react';
import { connect } from 'react-redux';
import subtractPtoDays from '../../actions/subtractPtoDays';
import Modal from 'react-modal';

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
      <div className="container">
        <div className="row">
          <div className="col s12 text-center">
            <img className="responsive" src={ profilePhoto } />
            <h5 className="text-center">{ email }</h5>
            <h5 className="text-center">Days Left: <b>{ recruiter.daysLeft }</b></h5>  
            <button onClick={ () => subtractPtoDays(recruiter, 1) } className="btn">Record PTO</button>   
            <button onClick={ this.handlePtoModal } className="btn">Modal</button>    
            <Modal
              isOpen={this.state.ptoModalOpen}
              contentLabel="Request Days"
              shouldCloseOnOverlayClick={true}
            >
              <PtoForm recruiter={ recruiter } profilePhoto={ profilePhoto } />
            </Modal>
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

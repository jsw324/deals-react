import React from 'react';
import { connect } from 'react-redux';
var Modal = require('react-modal');

import EndContract from 'EndContract';

class EndContractModal extends React.Component {
  constructor (props) {
    super(props);
    var { endContractModal } = this.props;
  }

  

  render() {
    var { endContractModal } = this.props;
    console.log('endcontractModal', endContractModal);
    if (endContractModal === false) {
    return <span />
    } else {
      console.log("open?", endContractModal.show);
      return (
        <div>
            <Modal
                  isOpen={endContractModal.show}
                  contentLabel="End Contract"
                  shouldCloseOnOverlayClick={true}
                  >
                  <div className="container">
                  <EndContract contractor={endContractModal.modalProps.contractor} />
                  </div>
                </Modal>
          </div>
      )
    }
  }
}

export default connect()(EndContractModal);
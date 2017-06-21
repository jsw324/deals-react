import React from 'react';
var Modal = require('react-modal');

import EndContract from './EndContract';

const EndContractModal = (props) => {
  var { endContractModal } = props;
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


export default EndContractModal;
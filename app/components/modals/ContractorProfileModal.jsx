import React from 'react';
var Modal = require('react-modal');

import ContractorProfile from './ContractorProfile';

const ContractorProfileModal = (props) => {
	var { profileModal, recruiters } = props;
	if (profileModal === false) {
		return (
			<span></span>
		)
	} else {
		return (
			<div>
				<Modal
					isOpen={profileModal.show}
					contentLabel="Profile"
					shouldCloseOnOverlayClick={true}
					>
					<div className="container">
						<ContractorProfile contractor={profileModal.modalProps.contractor} recruiters={recruiters} />
					</div>
				</Modal>
			</div>
		)
	}
}

export default ContractorProfileModal;
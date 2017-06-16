 import React from 'react';
 import { connect } from 'react-redux';

 import EndContract from 'EndContract';
 import EndContractModal from './modals/EndContractModal';
 import ContractorProfileModal from './modals/ContractorProfileModal';

 import moment from 'moment';
 var format = require('format-number');
 const actions = require('actions'); 
 var Modal = require('react-modal');
 const utils = require('./utils/utils.js');

 class ContractList extends React.Component {
   constructor (props) {
     super(props);
   }

   componentDidMount() {
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });
   }

   renderContractor() {
     var { allContractors, endContractModal, color, profileModal, recruiters, dispatch } = this.props;
     console.log('PROFILEMODAL', profileModal);
     if (allContractors !== undefined) {
       return (
         <div className="contractor__container">
          <div className="collection z-depth-2 contractor__list" style={{backgroundColor: color}}>
            <ul>
              <div className="col s2">
                <li className="flow-text thumbs__down name__color" onClick={() => dispatch(actions.showContractorProfile(allContractors))}>{allContractors.name}</li>
              </div>

              <div className="col s2">
                <li className="flow-text">{allContractors.client}</li>
              </div>

              <div className="col s2">
                <li className="flow-text">{utils.formatDate(allContractors.startDate)}</li>
              </div>

              <div className="col s2">
                <li className="flow-text">${allContractors.billRate}</li>
              </div>

              <div className="col s2">
                <li className="flow-text">${allContractors.hourly}</li>
              </div>

              <div className="col s1">
                <li className="flow-text">{format({prefix: '$' })(allContractors.spread)}</li>
              </div>
            
              <div className="col s1">
                <li className="flow-text thumbs__down"><i onClick={() => dispatch(actions.showEndContractModal(allContractors))} className="small material-icons icon__color">not_interested</i></li>
              </div>
            </ul>
          </div>
          <div className=""></div>
          <EndContractModal endContractModal={endContractModal} />
          <ContractorProfileModal profileModal={profileModal} recruiters={recruiters} />
        </div>
       )
     }
   }
   
  render () {
    return (
      <div>
        {this.renderContractor()}
      </div>
    )
   }
 }

 var mapStateToProps = (state) => {
   return (
     { 
      endContractModal: state.endContractModal,
      profileModal: state.profileModal,
      recruiters: state.recruiters
    }
   )
 }

 export default connect(mapStateToProps)(ContractList);
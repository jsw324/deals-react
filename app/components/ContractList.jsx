 import React from 'react';
 import { connect } from 'react-redux';

 import EndContract from 'EndContract';
 import EndContractModal from 'EndContractModal';

 import moment from 'moment';
 var format = require('format-number');
 const actions = require('actions'); 
 var Modal = require('react-modal');

 class ContractList extends React.Component {
   constructor (props) {
     super(props);
     this.state = {
       showEndContractModal: false
     }
     this.handleOpenModal = this.handleOpenModal.bind(this);
   }

   componentDidMount() {
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });
   }

   handleOpenModal () {
    var { dispatch, allContractors } = this.props;
    console.log('modal open');
    dispatch(actions.showEndContractModal(allContractors));
    //this.setState({ showEndContractModal: true }); //TODO: move this to a redux action generator
  }

  endContract(contractors) {
    var { dispatch, modal } = this.props;
    console.log('END', contractors);
    this.handleOpenModal();
  }

   renderContractor() {
     var { allContractors, modal, endContractModal } = this.props;
     if (allContractors !== undefined) {
       if (typeof allContractors.startDate === 'number') {
          allContractors.startDate = moment.unix(allContractors.startDate).format('MM/DD/YYYY');
        }
       return (
         <div className="contractor__container">
          <div className="collection z-depth-2 contractor__list">
            <ul>
              <div className="col s2">
                <li className="flow-text collection-item">{allContractors.name}</li>
              </div>

              <div className="col s2">
                <li className="flow-text">{allContractors.client}</li>
              </div>

              <div className="col s2">
                <li className="flow-text">{allContractors.startDate}</li>
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
                <li className="flow-text thumbs__down"><i onClick={() => this.handleOpenModal()} className="small material-icons icon__color">not_interested</i></li>
              </div>
            </ul>
          </div>
          <div className=""></div>
          <EndContractModal endContractModal={endContractModal} />
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

 export default connect()(ContractList);
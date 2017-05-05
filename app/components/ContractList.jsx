 import React from 'react';
 import { connect } from 'react-redux';

 import EndContract from 'EndContract';

 import moment from 'moment';
 var format = require('format-number');
 import ReactTable from 'react-table';
 const actions = require('actions'); 
 var Modal = require('react-modal');

 class ContractList extends React.Component {
   constructor (props) {
     super(props);
     this.state = {
       showEndContractModal: false
     }
     this.endContract = this.endContract.bind(this);
     this.handleOpenModal = this.handleOpenModal.bind(this);
   }

   componentDidMount() {
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });
   }

   handleOpenModal () {
    var { dispatch } = this.props;
    console.log('modal open');
    this.setState({ showEndContractModal: true });
  }

   endContract(contractors) {
     var { dispatch, modal } = this.props;
     console.log('END', contractors);
     this.handleOpenModal();
       //dispatch(actions.endContract(contractors));
   }

   renderContractor() {
     var { contractor, allContractors, modal } = this.props;
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
                <li className="flow-text">{allContractors.billRate}</li>
              </div>

              <div className="col s2">
                <li className="flow-text">{allContractors.hourly}</li>
              </div>

              <div className="col s1">
                <li className="flow-text">{allContractors.spread}</li>
              </div>
            
              <div className="col s1">
                <li className="flow-text thumbs__down"><i onClick={() => this.endContract(allContractors)} className="small material-icons icon__color">not_interested</i></li>
              </div>
            </ul>
          </div>
          <div className=""></div>
          <Modal
            isOpen={this.state.showEndContractModal}
            contentLabel="End Date"
            shouldCloseOnOverlayClick={true}
            >
            <div className="container">
             <EndContract contractor={allContractors} />
            </div>
          </Modal>
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
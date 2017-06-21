import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');
const utils = require('./../utils/utils.js');

import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

import PermChart from './../charts/PermChart';
import ContractChart from './../charts/ContractChart';
import AddPerm from './../modals/AddPerm';
import AddContractor from './../modals/AddContractor';
import EndContractModal from './../modals/EndContractModal';
import ContractorContainer from './../contractorList/ContractorContainer';

var Modal = require('react-modal');
var format = require('format-number');


class GetPerm extends React.Component {
  constructor (props) {
    super(props);

    //Bind all methods
    this.renderPerm = this.renderPerm.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.handleOpenPermModal = this.handleOpenPermModal.bind(this);
    this.handleOpenContractModal = this.handleOpenContractModal.bind(this);
  }

  onLogout(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.startLogout());
	}

  //when component loads, get all Perm and contract deals.
  componentWillMount () {
    var { dispatch } = this.props;
    dispatch(actions.getRecruiters()).then((val) => {
      dispatch(actions.getPerm());
      dispatch(actions.getContract());
    });
    // TODO: break YTD Perm and Contract boxes out to their own component

  }

  componentDidMount () {
    var { dispatch } = this.props;
   
  }

  handleOpenPermModal () {
    var { dispatch } = this.props;
    console.log('modal open');
    dispatch(actions.togglePermModal());
  }

  handleOpenContractModal () {
    var { dispatch } = this.props;
    console.log('contract modal');
    dispatch(actions.toggleContractModal());
  }

  getRecruiterName(id) {
    var { recruiters } = this.props;
    var result;
    recruiters.forEach((val) => {
      if (val.id === id) {
        result = val.name;
      } 
    })
    if (result) {
      return result;
    } else {
      return id;
    }
  }
 

  renderPerm () {
    var { getPerm, getContract, recruiters, permModal, contractModal, auth, toggleCompletedContracts, allContractors } = this.props;

    //define columns of ReactTable component
    const columns = [{
    header: 'Name',
    accessor: 'name'  
  }, {
    header: 'Client',
    accessor: 'client'
  }, {
    id: 'startDate', // Required because our accessor is not a string 
    header: 'Start Date',
    accessor: 'startDate'
  }, {
    header: 'Recruiter',
    accessor: 'recruiter'
  }, {
    header: 'Sales',
    accessor: 'sales'
  }, {
    header: 'Salary',
    accessor: 'salary',
    id: 'salary'
  }, {
    header: 'Fee %',
    accessor: 'fee',
    id: 'fee'
  }, {
    header: 'Fee',
    accessor: 'feeAmount',
    id: 'feeAmount'
  }]
  
    if (getContract.length >= 0){
      var ytdPermFees = 0;
      var deals = getPerm.map((val) => {
        ytdPermFees += (val.salary * (val.fee/100));
        if (typeof val.startDate !== 'string') {
          val.startDate = moment.unix(val.startDate).format('MM/DD/YYYY');
        };
        return {
          client: val.client,
          fee: val.fee,
          feeAmount: format({prefix: '$'})(val.salary * (val.fee/100)),
          id: val.id,
          name: val.name,
          recruiter: this.getRecruiterName(val.recruiter),
          salary: format({prefix: '$' })(val.salary),
          sales: this.getRecruiterName(val.sales),
          startDate: val.startDate
        }
      });
      var currentSpread = utils.currentSpread(getContract);
      var ytdSpread = utils.ytdSpread(getContract);
      return (
       <div>
        <div className="dashboard__body">
          <div className="row">
            <a href="#" onClick={ this.onLogout } className="logout__link">Logout</a>
            <h2 className="center-align">Dashboard</h2>
            
            <div className="col s10 offset-s1 l6 contract__box">
              <div className="perm__chart z-depth-3">
                <h5 className="center-align">Perm</h5>
                <PermChart deals={ getPerm }/>
              </div>
            </div>
           
            <div className="col s10 offset-s1 l6">
              <div className="contract__chart z-depth-3">
                <h5 className="center-align">Contract</h5>
                <ContractChart spread={ getContract } />
              </div>
            </div>
        </div>

        <div className="row">
          <div className="col s6 l6 contract__box">
            <div className="perm__chart z-depth-3">
              <h5 className="center-align"><b>Year to Date Perm</b></h5>
              <h4 className="center-align">{format({prefix: '$'})(ytdPermFees)}</h4>
            </div>
          </div>
          <div className="col s6 l6 contract__box">
            <div className="perm__chart z-depth-3">
              <h5 className="center-align"><b>Year to Date Contract Spread</b></h5>
              <h4 className="center-align">{format({prefix: '$'})(ytdSpread)}</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s6 l6 offset-s3 offset-l3 contract__box">
            <div className="perm__chart z-depth-3">
              <h5 className="center-align"><b>Current Spread</b></h5>
              <h4 className="center-align">{format({prefix: '$'})(currentSpread)}/week</h4>
            </div>
          </div>
        </div>

        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </a>
          <ul>
            <li><a onClick={ this.handleOpenPermModal } className="btn-floating blue">P</a></li>
            <li><a onClick={ this.handleOpenContractModal } className="btn-floating green">C</a></li>
          </ul>
        </div>
        <Modal
          isOpen={permModal}
          contentLabel="Add Full-Time"
          shouldCloseOnOverlayClick={true}
          >
          <AddPerm recruiters={ recruiters } />
          </Modal>

          <Modal
          isOpen={contractModal}
          contentLabel="Add Contractor"
          shouldCloseOnOverlayClick={true}
          >
          <AddContractor/>
          </Modal>
          <ContractorContainer contractors={getContract} toggleCompleted={toggleCompletedContracts}/>
            <div className="content__container"> 
              <h5 className="center-align">Perm Placements</h5>
              <div className="divider"></div>
              <div className="perm__table">
                <ReactTable
                  data={deals}
                  columns={columns}
                  resizable="true"
                  defaultPageSize="10"
                  noDataText="No Deals yet. Better hit those phones!"
                  />
                </div>
              </div>
          </div>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  };

  render () {
   var {perm} = this.props;
    return (
      <div>
        {this.renderPerm()}
      </div>
    )
  };
};

export default connect(
  (state) => {
    return state;
  }
)(GetPerm);
import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

import PermChart from 'PermChart';
import ContractChart from 'ContractChart';
import Nav from 'Nav';
import AddPerm from 'AddPerm';
import AddContractor from 'AddContractor';
import ContractList from 'ContractList';
import EndContractModal from 'EndContractModal';

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
    this.handleClosePermModal = this.handleClosePermModal.bind(this);
    this.handleCloseContractModal = this.handleCloseContractModal.bind(this);
    this.renderContractList = this.renderContractList.bind(this);
  }

  onLogout(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.startLogout());
	}

  //when component loads, get all Perm and contract deals.
  componentWillMount () {
    var { dispatch } = this.props;
    dispatch(actions.getPerm());
    dispatch(actions.getContract());
    dispatch(actions.getRecruiters());
  }

  handleOpenPermModal () {
    var { dispatch, modal } = this.props;
    console.log('modal open');
    dispatch(actions.getRecruiters());
    dispatch(actions.togglePermModal());
  }

  handleOpenContractModal () {
    var { dispatch } = this.props;
    console.log('contract modal');

    dispatch(actions.toggleContractModal());
  }

  handleClosePermModal() {
    var { dispatch } = this.props;
    dispatch(actions.togglePermModal());
  }

  handleCloseContractModal() {
    var { dispatch } = this.props;
    dispatch(actions.toggleContractModal());
  }


  renderContractList() {
    var {getContract, endContractModal} = this.props;
    if (getContract.length > 0) {
      //call ContractList component and pass allContractor object as prop
      var items = getContract.map((contractors) => {
        if (contractors.completedDate === '') {
          return (
            <div><ContractList key={contractors.id} allContractors={contractors} endContractModal={endContractModal}/></div>
          )
        }
      });
      //return items for rendering in JSX
      return <div>{items}</div>
    };
  };

  getRecruiterName(id) {
    var { recruiters } = this.props;
    var result;
    recruiters.forEach((val) => {
      if (val.id === id) {
        result = val.name;
      } else {
        result = id;
      }
    })
    return result;
  }
 

  renderPerm () {
    var { getPerm, getContract, recruiters, permModal, contractModal, auth } = this.props;

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
      for (var i = 0; i < getPerm.length; i++) {
        if (typeof getPerm[i].startDate === 'number') {
          getPerm[i].startDate = moment.unix(getPerm[i].startDate).format('MM/DD/YYYY');
        }
        var feeAmount = getPerm[i].salary * (getPerm[i].fee/100);
        getPerm[i].feeAmount = format({prefix: '$' })(feeAmount);
      }
      var deals = [];
      //TODO: change to .map
      // add feeAmount to object and format to currency.  
      getPerm.forEach((val) => {
        var feeAmount = format({prefix: '$'})(val.salary * (val.fee/100));
        var salary = format({prefix: '$' })(val.salary);
        //get recruiter name from ID number
        var name = this.getRecruiterName(val.recruiter);
        console.log('name', name);
        deals.push({
          client: val.client,
          fee: val.fee,
          feeAmount: feeAmount,
          id: val.id,
          name: val.name,
          recruiter: name,
          salary: salary,
          sales: name,
          startDate: val.startDate
        });
      })
      console.log('deals', deals);
      
      for (var i = 0; i < getContract.length; i++) {
        if (typeof getContract[i].startDate === 'number') {
          getContract[i].startDate = moment.unix(getContract[i].startDate).format('MM/DD/YYYY');
        }
      }
     
     
      return (
       <div>
        <div className="dashboard__body">
          <div className="row">
            <a href="#" onClick={this.onLogout} className="logout__link">Logout</a>
            <h2 className="center-align">Dashboard</h2>
            
            <div className="col s10 offset-s1 l6 contract__box">
              <div className="perm__chart z-depth-3">
                <h5 className="center-align">Perm</h5>
                <PermChart deals={getPerm}/>
              </div>
            </div>
           
            <div className="col s10 offset-s1 l6">
              <div className="contract__chart z-depth-3">
                <h5 className="center-align">Contract</h5>
                <ContractChart spread={getContract}/>
              </div>
            </div>
        </div>
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </a>
          <ul>
            <li><a onClick={this.handleOpenPermModal} className="btn-floating blue">P</a></li>
            <li><a onClick={this.handleOpenContractModal} className="btn-floating green">C</a></li>
          </ul>
        </div>
        <Modal
          isOpen={permModal}
          contentLabel="Add Full-Time"
          shouldCloseOnOverlayClick={true}
          >
          <AddPerm recruiters={recruiters} />
          </Modal>

          <Modal
          isOpen={contractModal}
          contentLabel="Add Contractor"
          shouldCloseOnOverlayClick={true}
          >
          <AddContractor/>
          </Modal>
        <div className="row">
          <div className="content__container">
            <h5 className="center-align">Active Contractors</h5> 
            <div className="divider"></div>
          </div>
             {this.renderContractList()}
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
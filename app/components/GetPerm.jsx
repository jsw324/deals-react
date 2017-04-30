import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import moment from 'moment';
import ReactTable from 'react-table';

import PermChart from 'PermChart';
import ContractChart from 'ContractChart';
import Nav from 'Nav';
import AddPerm from 'AddPerm';
import AddContractor from 'AddContractor';
import ContractList from 'ContractList';

var Modal = require('react-modal');

var format = require('format-number');


class GetPerm extends React.Component {
  constructor (props) {
    super(props);
    this.renderPerm = this.renderPerm.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.state = { showPermModal: false, showContractModal: false };
    this.handleOpenPermModal = this.handleOpenPermModal.bind(this);
    this.handleOpenContractModal = this.handleOpenContractModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderContractList = this.renderContractList.bind(this);
  }

  onLogout(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.startLogout());
	}

  componentWillMount () {
    var { dispatch } = this.props;
    dispatch(actions.getPerm());
    dispatch(actions.getContract());
  }

  handleOpenPermModal () {
    console.log('modal open');
    this.setState({ showPermModal: true });
  }

  handleOpenContractModal () {
    console.log('contract modal');
    this.setState({ showContractModal: true });
  }

  handleCloseModal() {
    this.setState({ showPermModal: false, showContractModal: false });
  }

  renderContractList() {
    var {getContract} = this.props;
    if (getContract.length > 0) {
      return (
        getContract.map((contractor) => {
          return (
            <ContractList key={contractor.id} contractor={contractor}/>
          )
        })
      );
    }
  }
 

  renderPerm () {
    var {getPerm, getContract} = this.props;
    if (getPerm.length > 0) {
     console.log('PERM', getPerm[0].startDate);
    }
    console.log('CONTRACT', getContract);
    const columns = [{
    header: 'Name',
    accessor: 'name' // String-based value accessors! 
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
  
    if (getContract.length > 0){
      for (var i = 0; i < getPerm.length; i++) {
        console.log('start date TYPE', typeof getPerm[i].startDate);
        console.log('start data', getPerm[i].startDate);
        if (typeof getPerm[i].startDate === 'number') {
          getPerm[i].startDate = moment.unix(getPerm[i].startDate).format('MM/DD/YYYY');
        }
        var feeAmount = getPerm[i].salary * (getPerm[i].fee/100);
        getPerm[i].feeAmount = format({prefix: '$' })(feeAmount);
       
      }
     
      return (
       <div>
        <Nav/>
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
          isOpen={this.state.showPermModal}
          contentLabel="Add Full-Time"
          shouldCloseOnOverlayClick={true}
          >
          <AddPerm/>
          <div className="row">
            <div className="col s4 offset-s6">
              <button className="btn blue" onClick={this.handleCloseModal}>Close Modal</button>
            </div>
          </div>
          </Modal>

          <Modal
          isOpen={this.state.showContractModal}
          contentLabel="Add Contractor"
          shouldCloseOnOverlayClick={true}
          >
          <AddContractor/>
          <button onClick={this.handleCloseModal}>Close Modal</button>
          </Modal>
        <div className="row">
            
            <h5 className="center-align">Contractors</h5>
            <ContractList contractors={getContract}/>
            {this.renderContractList()}
            <h5 className="center-align">Perm Placements</h5>
            <ReactTable
              data={getPerm}
              columns={columns}
              />
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
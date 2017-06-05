import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

import PermChart from 'PermChart';
import ContractChart from 'ContractChart';
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
    this.renderContractList = this.renderContractList.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
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

  handleChecked (event) {
    var { dispatch } = this.props;
    console.log('hey');
    event.preventDefault();
    console.log('event', event);
    const target = event.target;
    dispatch(actions.toggleCompletedContracts());
  //const value = target.type === 'checkbox' ? target.checked : target.value;
  }

  renderContractList() {
    var { getContract, toggleCompletedContracts } = this.props;
    if (getContract.length > 0) {
      //call ContractList component and pass allContractor object as prop
      var items = getContract.map((contractors) => {
        if (contractors.completedDate === '' || toggleCompletedContracts === true) {
          return (
            <div><ContractList key={contractors.id} allContractors={contractors} /></div>
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
      } 
    })
    if (result) {
      return result;
    } else {
      return id;
    }
  }
 

  renderPerm () {
    var { getPerm, getContract, recruiters, permModal, contractModal, auth, toggleCompletedContracts } = this.props;

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
        console.log(ytdPermFees + ' ' + val.fee);
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
      //console.log('STDD', deals[0].startDate);
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
          <div className="col s10 offset-s1 l6 contract__box">
            <div className="perm__chart z-depth-3">
              <h5 className="center-align"><b>Year to Date Perm</b></h5>
              <h4 className="center-align">{format({prefix: '$'})(ytdPermFees)}</h4>
            </div>
          </div>
          <div className="col s10 offset-s1 l6 contract__box">
            <div className="perm__chart z-depth-3">
              <h5 className="center-align"><b>Year to Date Contract Spread</b></h5>
              <h4 className="center-align">{format({prefix: '$'})(ytdPermFees)}</h4>
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
        <div className="row">
          <div className="content__container">
            <h5 className="center-align">Active Contractors <button className="btn center-align blue" onClick={ this.handleChecked }>Show Completed?</button></h5>
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
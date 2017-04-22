import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import moment from 'moment';
import ReactTable from 'react-table';
import PermChart from 'PermChart';
import ContractChart from 'ContractChart';
import Nav from 'Nav';

var format = require('format-number');


class GetPerm extends React.Component {
  constructor (props) {
    super(props);
    this.renderPerm = this.renderPerm.bind(this);
    this.onLogout = this.onLogout.bind(this);
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

  renderPerm () {
    var {getPerm, getContract} = this.props;
    console.log('props', this.props);

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
  
    if (getPerm.data !== undefined && getContract.data !== undefined){
      for (var i = 0; i < getPerm.length; i++) {
        getPerm.data[i].startDate = moment.unix(getPerm.data[i].startDate).format('MM/DD/YYYY');
        var feeAmount = getPerm.data[i].salary * (getPerm.data[i].fee/100);
       // getPerm.data[i].feeAmount = format({prefix: '$' })(feeAmount);
        // format library changes salary to a string and causes issues when passed to CHART component. Need to create an entirely new object
        // specifically for the table in order to manipulate currency formatting.
        //TODO: above.
        //getPerm.data.deals[i].salary = format({prefix: '$'})(getPerm.data.deals[i].salary);    
      }
      // console.log('start date', getPerm.data[0].startDate);
      // console.log('feeAmount', getPerm.data[0].feeAmount);
      return (
       <div>
        <Nav/>
        <div className="dashboard__body">
          <div className="row">
            <a href="#" onClick={this.onLogout} className="logout__link">Logout</a>
            <h2 className="center-align">Dashboard</h2>
            <div className="col s10 offset-s1 l6">
              <div className="perm__chart z-depth-3">
                <h5 className="center-align">Perm</h5>
                <PermChart deals={getPerm.data}/>
              </div>
            </div>
           
            <div className="col s10 offset-s1 l6">
              <div className="contract__chart z-depth-3">
                <h5 className="center-align">Contract</h5>
                <ContractChart spread={getContract.data}/>
              </div>
            </div>
        </div>
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="large material-icons" onClick={this.openNewContractModal}>add</i>
          </a>
        </div>
        <div className="row">
            <h4 className="center-align">Placements</h4>
            <ReactTable
              data={getPerm.data}
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
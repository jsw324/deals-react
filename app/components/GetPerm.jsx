import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import moment from 'moment';
import ReactTable from 'react-table';
import PermChart from 'PermChart';
import ContractChart from 'ContractChart';

var format = require('format-number');


class GetPerm extends React.Component {
  constructor (props) {
    super(props);
    this.renderPerm = this.renderPerm.bind(this);
  }

  componentWillMount () {
    var { dispatch } = this.props;
    dispatch(actions.getPerm());
   // dispatch(actions.getContract());
  }

  renderPerm () {
    var {getPerm} = this.props;

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
  
    if (getPerm.data !== undefined){
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
        <div className="charts__body">
          <div className="row">
            <h2 className="center-align">Dashboard</h2>
            <div className="col s10 offset-s1 l6">
              <h5 className="center-align">Perm</h5>
              <PermChart deals={getPerm.data}/>
            </div>
            <div className="col s10 offset-s1 l6">
              <h5 className="center-align">Contract</h5>
              <ContractChart deals={getPerm.data}/>
            </div>
        </div>
        <div className="row">
            <h4 className="center-align">Placements</h4>
            <ReactTable
              data={getPerm.data}
              columns={columns}
              />
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
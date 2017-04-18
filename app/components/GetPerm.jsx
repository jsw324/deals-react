import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import moment from 'moment';
import ReactTable from 'react-table';
import PermChart from 'PermChart';


class GetPerm extends React.Component {
  constructor (props) {
    super(props);
    this.renderPerm = this.renderPerm.bind(this);
  }

  componentWillMount () {
    var { dispatch } = this.props;
    dispatch(actions.getPerm());
  }

  renderPerm () {
    console.log('props', this.props);
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
      console.log('we here now', getPerm.data);
     // var feeDollars = (perm.data.deals[0].fee/100) * perm.data.deals[0].salary;
      //console.log('fee is', feeDollars);
      for (var i = 0; i < getPerm.data.deals.length; i++) {
        var mom = moment(getPerm.data.deals[i].startDate);
        getPerm.data.deals[i].startDate = moment.unix(getPerm.data.deals[i].startDate).format('MM/DD/YYYY');
      }
      return (
        <div>
          <h1 className="center-align">Perm Placements</h1>
          <PermChart deals={getPerm.data}/>
          <h4 className="center-align">Placements</h4>
          <ReactTable
            data={getPerm.data.deals}
            columns={columns}
            />
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
   console.log('perm');
  
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
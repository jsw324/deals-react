import React from 'react';
import { connect } from 'react-redux';
const actions = require('actions');

import ReactTable from 'react-table';

import Perm from 'Perm';

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
    var {perm} = this.props;
    console.log('perm', perm);

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
    header: 'Fee',
    accessor: 'fee',
    id: 'fee'
  }]

    if (perm.data !== undefined){
      console.log('we here now', perm.data);
      return (
        <div>
          <h1 className="center-align">Perm Placements</h1>
          <ReactTable
            data={perm.data.deals}
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